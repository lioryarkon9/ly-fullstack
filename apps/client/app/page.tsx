import React from 'react';
import { CreateGreetingCard } from './CreateGreetingCard';
import { ToggleDialogButton } from './ToggleDialogButton';

type TBirthdayCard = {
  id: string;
  content: string;
  timestamp: string;
};

type TResults = {
  data: {
    [userId: string]: {
      [contentId: string]: TBirthdayCard;
    };
  };
};

type TUser = {
  id: string;
  name: string;
};

const DEMO_USERS: { [userId: string]: TUser } = {
  'abb8345f-69b7-4c46-b465-51977b1cf388': {
    id: 'abb8345f-69b7-4c46-b465-51977b1cf388',
    name: 'Michael Jordan',
  },
};

const DEMO_RESULTS: TResults = {
  data: {
    'abb8345f-69b7-4c46-b465-51977b1cf388': {
      '219aa753-bfa7-4a6c-9ee9-2f5763b92074': {
        id: '219aa753-bfa7-4a6c-9ee9-2f5763b92074',
        content:
          "Happy birthday to a superstar in the making!\nYou dribble through life with boundless energy and joy.\nMay your love for basketball soar to new heights!\nRoar like a lion, wild and fierce on your special day.\nWith each step, may you leave pawprints of kindness.\nWishing you a day filled with laughter and adventure!\nYou're a slam dunk of happiness. Enjoy your birthday!",
        timestamp: '2020-02-23',
      },
    },
  },
};

function getPreviousResults({ userId }: { userId: string }) {
  return Promise.resolve(DEMO_RESULTS.data[userId]);
}

function getUser(id: string) {
  return Promise.resolve(DEMO_USERS[id]);
}

export default async function Index() {
  const loggedInUserId = 'abb8345f-69b7-4c46-b465-51977b1cf388';
  const user = await getUser(loggedInUserId);
  const previousResults = await getPreviousResults({
    userId: 'abb8345f-69b7-4c46-b465-51977b1cf388',
  });
  const uiPreviousResults = Object.values(previousResults);

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

          <CreateGreetingCard />

          <div id="commands" className="rounded shadow">
            <h2>Previous birthday cards</h2>
            {uiPreviousResults.map((birthdayCard) => (
              <details key={birthdayCard.id}>
                <summary>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {birthdayCard.timestamp}: {birthdayCard.content.slice(0, 20)}
                  ...
                </summary>
                {birthdayCard.content}
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
