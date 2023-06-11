import { buildSchema } from 'graphql';
import { graphqlHandler } from '../../../libs/graphql-handler/src/index';

const DEMO_RESPONSE = `Happy birthday to a superstar in the making!\nYou dribble through life with boundless energy and joy.\nMay your love for basketball soar to new heights!\nRoar like a lion, wild and fierce on your special day.\nWith each step, may you leave pawprints of kindness.\nWishing you a day filled with laughter and adventure!\nYou're a slam dunk of happiness. Enjoy your birthday!`;

const GRAPHQL_SCHEMA = buildSchema(`
  type CreateArticle {
    result: String!
  }
  type Query {
    createArticle(instructions: String!): CreateArticle!
  }
`);
const GRAPHQL_QUERY_RESOLVER = {
  createArticle: ({ instructions }) => ({
    result: DEMO_RESPONSE,
  }),
};

export function handleApi2Graphql({ request, response }) {
  graphqlHandler({
    request,
    response,
    schema: GRAPHQL_SCHEMA,
    queryResolver: GRAPHQL_QUERY_RESOLVER,
  });
}
