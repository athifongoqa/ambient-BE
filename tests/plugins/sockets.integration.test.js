const io = require('socket.io-client');
const ioBack = require('socket.io');
const { build } = require('../routes/helper')

let socket;
let ioServer;

beforeAll( async (done) => {
  let app;
  app = await build();
  ioServer = ioBack(app);
  done();
}, 15000);

beforeEach((done) => {
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
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

describe('basic socket.io example', () => {
  test('should communicate', (done) => {
    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
  test('should communicate with waiting for socket.io handshakes', (done) => {
    // Emit sth from Client do Server
    socket.emit('examlpe', 'some messages');
    // Use timeout to wait for socket.io server handshakes
    setTimeout(() => {
      // Put your server side expect() here
      done();
    }, 50);
  });
});