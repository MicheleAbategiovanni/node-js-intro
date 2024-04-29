// Possiamo definirlo o App.js o Server.js

// Andiamo a prendere il modulo Http di Nodejs
const http = require("http");
const routes = require("./routes");

// console.log('Ciao: ' + routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
