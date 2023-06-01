import httpServer from 'http';
import {handleApi2Graphql} from './handleGraphql'

const PORT = process.env.PORT || 4444;

httpServer
  .createServer((request, response) => {
    console.log('Incoming request', request.url, new Date(Date.now()).toJSON());

    if (request.url === '/graphql' && request.method === 'POST') {
      handleApi2Graphql({request, response})

      return;
    }

    response.end(JSON.stringify({ error: 'BAD_REQUEST' }));
  })
  .listen(PORT);

console.log(`http server running on port '${PORT}'`);
