const TicketList = require("./TicketList");

class Sockets {
  constructor(io) {
    this.io = io;

    //crear instancia del ticketList
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    //on conection
    this.io.on("connection", (socket) => {
      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
        // this.io.emit("ticket-generado", nuevoTicket);
      });

      socket.on("next-ticket", (data, callback) => {
        const ticket = this.ticketList.asignarTicket(
          data.agente,
          data.escritorio
        );
        callback(ticket);

        this.io.emit("ticket-asignado", this.ticketList.ultimos13);
      });
    });
  }
}

module.exports = Sockets;
