import { NextResponse } from 'next/server';
import {DEMO_RESULTS} from '../../demo_data';

export async function POST(request: Request) {
  const body = await request.json();
  const createCardRequest = await fetch('http://localhost:3333/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `{makeCard(name: "${body.name}", age: "${
        body.age
      }", habits: ${JSON.stringify(body.selectedHabits)}, otherHabit: "${
        body.otherHabit
      }")}`,
    }),
  });
  const createCardResponse = await createCardRequest.json();

  return NextResponse.json({ response: createCardResponse });
}
