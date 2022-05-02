const boom = require('boom');

function get_participant_with_socket(participant) {
    try {
        return {
            ...participant,
            socketId: socket.id,
            roomId: participant.activeShow._id
          }
    } catch (err) {
        throw boom.boomify(err);
    }
  }

function userJoinRoom(participant){
    try {
        const roomId = participant.activeShow._id
        socket.join(roomId);
        console.log("user joined", io.sockets.adapter.rooms);
        socket.broadcast.to(roomId).emit('user-joined-show', get_participant_with_socket(participant));
    } catch (err) {
        throw boom.boomify(err);
    }
}

function callRoom({participant, socketId}){
    try {
        console.log('calling', socketId);
        socket.broadcast.to(socketId).emit('called', get_participant_with_socket(participant))
    } catch (err) {
        throw boom.boomify(err);
    }
}

function leaveRoom(room){
    try {
        socket.leave(room); 
        console.log(socket.id, "left", room)
        socket.broadcast.to(room).emit('user-left-show', socket.id)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function disconnectSocket(reason) {
    try {
        console.log('user disconnected')
        console.log(reason, socket.rooms, socket.id)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function spotifyPlaybackUpdate ({playerState, showId}) {
    try {
        console.log(showId)
        socket.broadcast.to(showId).emit('playback-updated', playerState)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function initialPlaybackSync({toUserId, playerState}) {
    try {
        console.log(toUserId, playerState)
        socket.broadcast.to(toUserId).emit('playback-updated', playerState)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function messageSend({showId, message, user}, callback) {
    try {
        console.log(`${user.displayName} says: ${message}`)
        callback({message, user})
        socket.to(showId).emit('message-receive', {message, user})
    } catch (err) {
        throw boom.boomify(err);
    }
}

function toggleMute(showId, peerId, isMuted) {
    try {
        console.log('mute event');
        socket.broadcast.to(showId).emit('toggle-mute', peerId, isMuted);
    } catch (err) {
        throw boom.boomify(err);
    }
}


module.exports = {
    userJoinRoom, callRoom, leaveRoom, disconnectSocket, spotifyPlaybackUpdate, initialPlaybackSync, messageSend, toggleMute
}