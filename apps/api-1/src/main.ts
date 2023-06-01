import httpServer from "http";

fetch('http://localhost:4444/ping').then(result => result.json()).then(result => console.log(result))

const PORT = process.env.PORT || 3333;

httpServer.createServer((request, response) => {
  console.log("Incoming request", request.url, new Date(Date.now()).toJSON());


}).listen(PORT)

console.log(`http server running on port '${PORT}'`);

