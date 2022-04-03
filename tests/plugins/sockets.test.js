const { build } = require('../routes/helper');
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Socket interations", () => {
  let app, io, serverSocket, clientSocket;
	
  beforeAll(async() => {
		app = await build();
		const server = require('http').createServer(app);
		io = require('socket.io')(server);

    app.listen(() => {
      const port = 3000;
      clientSocket = new Client('http://localhost:3000');
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", (sock) => {
				console.log('Connected!');
			});
    });
  }, 15000);

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", () => {
    clientSocket.on("connect", (arg) => {
      expect(arg).toBe("world");
    });
    serverSocket.emit("hello", "world");
  });
});