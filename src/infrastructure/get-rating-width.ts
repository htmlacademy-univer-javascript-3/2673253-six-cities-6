import {MAX_RATING} from '../const.ts';

export const getRatingWidth = (rating: number): string => `${(rating * 100) / MAX_RATING}%`;

