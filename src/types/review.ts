import {ReviewUser} from './review-user.ts';

export type Review = {
  id: string;
  date: string;
  user: ReviewUser;
  comment: string;
  rating: number;
};
