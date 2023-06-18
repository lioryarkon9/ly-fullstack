import { NextResponse } from 'next/server';
import { firbaseApp } from 'libs/remote-storage/src';

import { getFirestore, getDocs, collection, doc } from 'firebase/firestore';

const db = getFirestore(firbaseApp);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'NO_USER_ID' });
  }

  const greetingsByUserIdCollection = collection(db, `greetings`);
  const snapShot = await getDocs(greetingsByUserIdCollection);
  const snapShotData = snapShot.docs
    .filter((document) => document.id === userId)
    .map((document) => Object.values(document.data()))
    .flat();

  console.log('snapShotData: ', snapShotData);

  return NextResponse.json(snapShotData);
}
