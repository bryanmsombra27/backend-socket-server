const { v4: uuid } = require("uuid");

class Ticket {
  constructor(number) {
    this.id = uuid();
    this.number = number;
    this.escritorio = null;
    this.agente = null;
  }
}

module.exports = Ticket;
