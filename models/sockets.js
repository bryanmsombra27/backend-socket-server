class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    //on conection
    this.io.on("connection", (socket) => {
      socket.on("mensajes-cliente", (data) => {
        this.io.emit("mensajes-servidor", data);
      });
    });
  }
}

module.exports = Sockets;
