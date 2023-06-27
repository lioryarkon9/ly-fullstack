import { buildSchema } from 'graphql';
import { graphqlHandler } from '../../../libs/graphql-handler/src/index';

const DEMO_RESPONSE = `Happy birthday to a superstar in the making!\nYou dribble through life with boundless energy and joy.\nMay your love for basketball soar to new heights!\nRoar like a lion, wild and fierce on your special day.\nWith each step, may you leave pawprints of kindness.\nWishing you a day filled with laughter and adventure!\nYou're a slam dunk of happiness. Enjoy your birthday!`;

const GRAPHQL_SCHEMA = buildSchema(`
  type CreateGreeting {
    result: String!
  }
  type Query {
    createGreeting(instructions: String!): CreateGreeting!
  }
`);
const GRAPHQL_QUERY_RESOLVER = {
  createGreeting: async ({ instructions }) => {
    console.log('instructions: ', instructions);
    const aiRequest = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: instructions,
        max_tokens: 30,
        temperature: 0,
      }),
    });

    const aiResponse = await aiRequest.json();

    console.log('aiResponse: ', aiResponse);

    return {
      result: aiResponse.choices[0].text,
    };
  },
};

export function handleApi2Graphql({ request, response }) {
  graphqlHandler({
    request,
    response,
    schema: GRAPHQL_SCHEMA,
    queryResolver: GRAPHQL_QUERY_RESOLVER,
  });
}
