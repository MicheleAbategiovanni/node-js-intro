// Possiamo definirlo o App.js o Server.js

// Andiamo a prendere il modulo Http di Nodejs
const { log } = require("console");
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log(req);

  // Alcuni dati che potrebbero tornarci utili dalla richiesta
  log("Url: " + req.url);
  log("Method: " + req.method);
  log("Headers: " + req.headers);

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body><h1>Enter your message</h1><br>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {

    const body = [];

    // Aggiungiamo un EventListener 
    req.on('data', (chuck) => {
        log('Chuck: ' + chuck);
        body.push(chuck);
    });

    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        log('Buffer: ' + parsedBody);
        const message = parsedBody.split('=')[1];
        log('Body Split: ' + message);
        fs.writeFileSync('message.text', message);
    });
    
    res.statusCode = 302;
    res.setHeader("Location", "/");
    //
    return res.end();
  }

  // Andiamo a dare una risposta al nostro server

  // Settiamo l'header content-type di risposta
  res.setHeader("Content-Type", "text/html");

  // html di risposta con write
  res.write("<h1>Hello World</h1>");
  res.end();
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
