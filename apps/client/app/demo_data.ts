import { TResults } from './types';

type TUser = {
  id: string;
  name: string;
};

export const DEMO_USERS: { [userId: string]: TUser } = {
  'abb8345f-69b7-4c46-b465-51977b1cf388': {
    id: 'abb8345f-69b7-4c46-b465-51977b1cf388',
    name: 'Michael Jordan',
  },
};

export const DEMO_RESULTS: TResults = {
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
