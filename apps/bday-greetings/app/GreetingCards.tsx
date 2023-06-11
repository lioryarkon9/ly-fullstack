'use client';
import React from 'react';
import { TResults } from './types';
import { useQuery } from 'react-query';

type TProps = {
  userId: string;
};

const DEMO_UPDATED_RESULTS: TResults = {
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
  return Promise.resolve(Object.values(DEMO_UPDATED_RESULTS.data[userId]));
}

export const GreetingCards: React.FC<TProps> = ({ userId }) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['initial-greetings', userId],
    queryFn: () => getPreviousResults({ userId }),
  });
  return (
    <>
      {data?.map((greeting) => (
        <details key={greeting.id}>
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
            {greeting.timestamp}: {greeting.content.slice(0, 20)}
            ...
          </summary>
          {greeting.content}
        </details>
      ))}
    </>
  );
};
