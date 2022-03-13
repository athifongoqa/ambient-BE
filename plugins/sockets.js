const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-socket.io'))

  fastify.ready(err => {
    if (err) throw err
  
    fastify.io.on('connection', (socket) => { 
          console.log('A user just connected');
  
      const get_participant_with_socket = (participant) => {
        return {
          ...participant,
          socketId: socket.id,
          roomId: participant.activeShow._id
        }
      }
    
      socket.on('user-join-show', (participant) => {

        const roomId = participant.activeShow._id
        socket.join(roomId);
        console.log("user joined", io.sockets.adapter.rooms);
        socket.broadcast.to(roomId).emit('user-joined-show', get_participant_with_socket(participant));
      
      });
    });
  })
})