const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  //emitir
  // socket.emit("mensaje-bienvenido", {
  //   msg: "Hello motherfucker",
  //   date: new Date(),
  // });

  //escuchar
  // socket.on("mensaje-cliente", (data) => {
  //   console.log("Mensaje recibido");
  //   console.log(data);
  // });
  socket.on("mensajes-cliente", (data) => {
    console.log("Mensaje recibido");
    console.log(data);

    socket.emit("mensajes-servidor", data);
  });
});

server.listen(8080, () => {
  console.log("APLICACION CORRIENDO POR EL PUERTO 8080");
});
