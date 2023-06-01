import { buildSchema } from 'graphql';
import {graphqlHandler} from '../../../libs/graphql-handler/src/index';

const GRAPHQL_SCHEMA = buildSchema(`
  type CreateArticle {
    result: String!
  }
  type Query {
    createArticle(topic: String!): CreateArticle!
  }
`);
const GRAPHQL_QUERY_RESOLVER = {
  createArticle: ({topic}) => ({result: `got topic: '${topic}'`}),
};

export function handleApi2Graphql({request, response}) {
  graphqlHandler({request, response, schema: GRAPHQL_SCHEMA, queryResolver: GRAPHQL_QUERY_RESOLVER})
}
