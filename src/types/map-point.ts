import {Location} from './location.ts';
import {City} from './city.ts';

export type MapPoint = {
  id: string;
  location: Location;
  city: City;
};
