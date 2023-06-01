import { graphql } from 'graphql';

export function graphqlHandler({ request, response, schema, queryResolver }) {
  let requestChunks = [];

  request.on('data', (chunk) => requestChunks.push(chunk));
  request.on('end', () => {
    const requestBody = JSON.parse(requestChunks.join(''));

    graphql({
      schema,
      source: `${requestBody.query}`,
      rootValue: queryResolver,
    }).then((queryResult) => response.end(JSON.stringify(queryResult)));
  });
}
