import {MAX_RATING} from '../const.ts';

export const getRatingWidth = (rating: number): string => {
  const rounded = Math.min(MAX_RATING, Math.round(rating));
  return `${(rounded * 100) / MAX_RATING}%`;
};
