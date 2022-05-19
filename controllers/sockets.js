const boom = require('boom');

function getParticipantWithSocket(participant) {
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
        socket.broadcast.to(roomId).emit('user-joined-show', getParticipantWithSocket(participant));
    } catch (err) {
        throw boom.boomify(err);
    }
}

function callRoom({participant, socketId}){
    try {
        socket.broadcast.to(socketId).emit('called', getParticipantWithSocket(participant))
    } catch (err) {
        throw boom.boomify(err);
    }
}

function leaveRoom(room){
    try {
        socket.leave(room); 
        socket.broadcast.to(room).emit('user-left-show', socket.id)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function disconnectSocket(reason) {
    try {
        return reason, socket.rooms, socket.id
    } catch (err) {
        throw boom.boomify(err);
    }
}

function spotifyPlaybackUpdate ({playerState, showId}) {
    try {
        socket.broadcast.to(showId).emit('playback-updated', playerState)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function initialPlaybackSync({toUserId, playerState}) {
    try {
        socket.broadcast.to(toUserId).emit('playback-updated', playerState)
    } catch (err) {
        throw boom.boomify(err);
    }
}

function messageSend({showId, message, user}, callback) {
    try {
        callback({message, user})
        socket.to(showId).emit('message-receive', {message, user})
    } catch (err) {
        throw boom.boomify(err);
    }
}

function toggleMute(showId, peerId, isMuted) {
    try {
        socket.broadcast.to(showId).emit('toggle-mute', peerId, isMuted);
    } catch (err) {
        throw boom.boomify(err);
    }
}

module.exports = {
    userJoinRoom, 
    callRoom, 
    leaveRoom, 
    disconnectSocket, 
    spotifyPlaybackUpdate, 
    initialPlaybackSync, 
    messageSend, 
    toggleMute
}