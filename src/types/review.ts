import {reviewUser} from './reviewUser.ts';

export type Review = {
  id: string;
  date: string;
  user: reviewUser;
  comment: string;
  rating: number;
}
