const fp = require('fastify-plugin')
const { 
  userJoinRoom, 
  callRoom, 
  leaveRoom 
} = require('../controllers/sockets')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-socket.io'))

  fastify.ready(err => {
    if (err) throw err
  
    fastify.io.on('connection', (socket) => { 

      socket.on('user-join-show', userJoinRoom);

      socket.on('call', callRoom);

      socket.on('leave-show', leaveRoom);

      socket.on('disconnect', (reason) => {
        console.log('user disconnected')
        console.log(reason, socket.rooms, socket.id)
      });

      socket.on('playback-update', ({playerState, showId}) => {
        console.log(showId)
        socket.broadcast.to(showId).emit('playback-updated', playerState)
      });

      socket.on('playback-initial-sync', ({toUserId, playerState}) => {
        console.log(toUserId, playerState)
        socket.broadcast.to(toUserId).emit('playback-updated', playerState)
      });

      socket.on('message-send', ({showId, message, user}, callback) => {
        console.log(`${user.displayName} says: ${message}`)
        callback({message, user})
        socket.to(showId).emit('message-receive', {message, user})
      });

      socket.on('toggle-mute', (showId, peerId, isMuted) => {
        console.log('mute event');
        socket.broadcast.to(showId).emit('toggle-mute', peerId, isMuted);
      });
    });
  });
});