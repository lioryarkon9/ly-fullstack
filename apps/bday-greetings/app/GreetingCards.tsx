'use client';
import React from 'react';
import {DEMO_RESULTS} from './demo_data';
import { useQuery } from 'react-query';

type TProps = {
  userId: string;
};

function getPreviousResults({ userId }: { userId: string }) {
  return Promise.resolve(Object.values(DEMO_RESULTS.data[userId]));
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
