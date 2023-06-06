import httpServer from 'http';
import { handleApi1Graphql } from './handleGraphql';

const PORT = process.env.PORT || 3333;

httpServer
  .createServer((request, response) => {
    console.log('Incoming request', request.url, new Date(Date.now()).toJSON());

    if (request.url === '/graphql' && request.method === 'POST') {
      handleApi1Graphql({ request, response });

      return;
    }

    response.end('INVALID_REQUEST');
  })
  .listen(PORT);

console.log(`http server running on port '${PORT}'`);
