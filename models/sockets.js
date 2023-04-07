const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    //on conection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");

      //emitir al cliente conectado todas las bandas actuales

      socket.emit("current-bands", this.bandList.getBands());

      socket.on("votar-por-banda", (data) => {
        this.bandList.increaseVotes(data);
        this.io.emit("current-bands", this.bandList.getBands()); //emitir a todos los conectados
      });

      socket.on("delete-band", (data) => {
        this.bandList.removeBand(data);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("edit-band", (data) => {
        this.bandList.changeName(data.id, data.name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("add-band", (data) => {
        this.bandList.addBand(data);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
