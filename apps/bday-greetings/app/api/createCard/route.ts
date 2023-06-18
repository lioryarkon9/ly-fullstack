import { NextResponse } from 'next/server';
import {firbaseApp} from 'libs/remote-storage/src'
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firbaseApp);

export async function POST(request: Request) {
  const body = await request.json();
  const createCardRequest = await fetch('http://localhost:3333/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `{makeCard(name: "${body.name}", age: "${
        body.age
      }", habits: ${JSON.stringify(body.selectedHabits)}, otherHabit: "${
        body.otherHabit
      }") {id, content, timestamp}}`,
    }),
  });
  const createCardResponse = await createCardRequest.json();

  console.log('createCardResponse: ', createCardResponse)

  // await setDoc(doc(db, ['greetings', body.userId, createCardResponse.data.makeCard.id]), createCardResponse.data.makeCard, {merge: true});
  await setDoc(doc(db, `greetings/${body.userId}`), {[createCardResponse.data.makeCard.id]: createCardResponse.data.makeCard}, {merge: true});

  return NextResponse.json({ response: createCardResponse });
}
