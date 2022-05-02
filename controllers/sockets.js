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



module.exports = {
    userJoinRoom, callRoom, leaveRoom
}