const boom = require('boom');

function userJoinRoom(participant){
    const roomId = participant.activeShow._id
    socket.join(roomId);
    console.log("user joined", io.sockets.adapter.rooms);
    socket.broadcast.to(roomId).emit('user-joined-show', get_participant_with_socket(participant));
}

module.exports = {
    userJoinRoom
}