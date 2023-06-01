import { buildSchema } from 'graphql';
import {graphqlHandler} from '../../../libs/graphql-handler/src/index';

const GRAPHQL_SCHEMA = buildSchema(`
  type Query {
    hello(name: String!): String!
  }
`);
const GRAPHQL_QUERY_RESOLVER = {
  hello: ({name}) => `got name: '${name}'`
};

export function handleApi1Graphql({request, response}) {
  graphqlHandler({request, response, schema: GRAPHQL_SCHEMA, queryResolver: GRAPHQL_QUERY_RESOLVER})
}