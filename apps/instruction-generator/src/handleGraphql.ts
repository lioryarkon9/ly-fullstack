import { buildSchema } from 'graphql';
import { graphqlHandler } from '../../../libs/graphql-handler/src/index';
import crypto from 'crypto'

const YEARS_TEXT_BY_DESCRIPTION: { [key: string]: string } = {
  BABY: '0-2',
  CHILD: '3-8',
  TEENAGER: '9-14',
  ADULT: 'over 15',
};

const GRAPHQL_SCHEMA = buildSchema(`
  type Card {
    id: String!
    content: String!
    timestamp: String!
  }
  type Query {
    makeCard(name: String!, age: String!, habits: [String!], otherHabit: String): Card!
  }
`);

const getHabitsText = (habits: string[]): string => {
  if (habits.length === 1) {
    return habits[0];
  }

  if (habits.length === 2) {
    const [first, second] = habits;

    return `${first} and ${second}`;
  }

  return habits
    .map((habit, index, self) => {
      const isLast = index + 1 === self.length;

      return isLast ? `and ${habit}` : `${habit},`;
    })
    .join(' ');
};

const GRAPHQL_QUERY_RESOLVER = {
  makeCard: async ({ name, age, habits }) => {
    const ageText = YEARS_TEXT_BY_DESCRIPTION[age.toUpperCase()];
    const habitsText = getHabitsText(habits);
    const aiInstructions = `Generate a birthday card wish for a boy named ${name}, who is about ${ageText} years old, and likes ${habitsText}`;

    const aiRequest = await fetch('http://localhost:4444/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `{createGreeting(instructions:"${aiInstructions}") {result}}`,
      }),
    });
    const aiResponse = await aiRequest.json();

    const nowDate = new Date(Date.now())
    const result = {
      id: crypto.randomUUID(),
      content: aiResponse.data.createGreeting.result,
      timestamp: nowDate.toJSON()
    }

    return result;
  },
};

export function handleApi1Graphql({ request, response }) {
  graphqlHandler({
    request,
    response,
    schema: GRAPHQL_SCHEMA,
    queryResolver: GRAPHQL_QUERY_RESOLVER,
  });
}
