import httpServer from 'http';
import { handleApi1Graphql } from './handleGraphql';

// fetch('http://localhost:4444/graphql', {
//   method: 'POST',
//   body: JSON.stringify({
//     query: `{createArticle(topic:"technology") {result}}`
//   })
// })
//   .then(res1 => res1.json())
//   .then(res2 => console.log(res2))

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
