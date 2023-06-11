export type TResults = {
  data: {
    [userId: string]: {
      [contentId: string]: TBirthdayCard;
    };
  };
};

export type TBirthdayCard = {
  id: string;
  content: string;
  timestamp: string;
};
