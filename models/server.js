const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());

    this.app.get("/ultimos", (req, res) => {
      return res.status(200).send({
        ok: true,
        tickets: this.sockets.ticketList.ultimos13,
      });
    });
  }

  // configurarSockets() {
  //   new Sockets(this.io);
  // }

  execute() {
    this.middlewares();
    // this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log(`aplicacion corriendo por el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
