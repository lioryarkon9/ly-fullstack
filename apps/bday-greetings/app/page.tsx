import React from 'react';
import { CreateGreetingCard } from './CreateGreetingCard';
import { ToggleDialogButton } from './ToggleDialogButton';
import { GreetingCards } from './GreetingCards';
import { DEMO_USERS } from './demo_data';

function getUser(id: string) {
  return Promise.resolve(DEMO_USERS[id]);
}

export default async function Index() {
  const loggedInUserId = 'abb8345f-69b7-4c46-b465-51977b1cf388';
  const user = await getUser(loggedInUserId);

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, {user.name}</span>
              Welcome to birthday cards generator 👋
            </h1>

            <ToggleDialogButton />
          </div>

          <CreateGreetingCard userId={loggedInUserId} />

          <GreetingCards userId={loggedInUserId} />
        </div>
      </div>
    </div>
  );
}
