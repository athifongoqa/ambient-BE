const io = require('socket.io-client');

let socket;

beforeEach((done) => {
  // Setup
  socket = io.connect('http://localhost:3000', {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
  });
  socket.on('connect', () => {
    console.log('worked...');
    done();
  });
  socket.on('disconnect', () => {
    console.log('disconnected...');
  });
}, 15000);

afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    console.log('disconnecting...');
    socket.disconnect();
  } else {
    // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
    console.log('no connection to break...');
  }
  done();
});

describe('E2E Socket events', () => {
    it('Silly', async () => {
      expect(1).toEqual(1);
    });
  });
