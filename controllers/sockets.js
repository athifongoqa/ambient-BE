const boom = require('boom');

function get_participant_with_socket(participant) {
    return {
      ...participant,
      socketId: socket.id,
      roomId: participant.activeShow._id
    }
  }

function userJoinRoom(participant){
    const roomId = participant.activeShow._id
    socket.join(roomId);
    console.log("user joined", io.sockets.adapter.rooms);
    socket.broadcast.to(roomId).emit('user-joined-show', get_participant_with_socket(participant));
}

function callRoom({participant, socketId}){
    console.log('calling', socketId);
    socket.broadcast.to(socketId).emit('called', get_participant_with_socket(participant))
}

function leaveRoom(room){
    socket.leave(room); 
    console.log(socket.id, "left", room)
    socket.broadcast.to(room).emit('user-left-show', socket.id)
}

function disconnectSocket(reason) {
    console.log('user disconnected')
    console.log(reason, socket.rooms, socket.id)
}

function spotifyPlaybackUpdate ({playerState, showId}) {
    console.log(showId)
    socket.broadcast.to(showId).emit('playback-updated', playerState)
}

function initialPlaybackSync({toUserId, playerState}) {
    console.log(toUserId, playerState)
    socket.broadcast.to(toUserId).emit('playback-updated', playerState)
  }



module.exports = {
    userJoinRoom, callRoom, leaveRoom, disconnectSocket, spotifyPlaybackUpdate, initialPlaybackSync
}