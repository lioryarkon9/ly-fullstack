import httpServer from "http";

const PORT = process.env.PORT || 4444;

httpServer.createServer((request, response) => {
  console.log("Incoming request", request.url, new Date(Date.now()).toJSON());

  response.end(JSON.stringify({response: 'hi'}))
}).listen(PORT)

console.log(`http server running on port '${PORT}'`);