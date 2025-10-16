import {Place} from '../types';

export const favoritePlaces: Place[] = [
  {
    id: '1',
    imgSrc: 'img/room-small.jpg',
    mark: 'Super offer',
    priceValue: 120,
    priceText: 'night',
    description: 'Cozy apartment in the city center',
    type: 'Apartment',
  },
  {
    id: '2',
    imgSrc: 'img/apartment-small-04.jpg',
    mark: 'Best value',
    priceValue: 150,
    priceText: 'night',
    description: 'Modern studio with a great view',
    type: 'Studio',
  },
  {
    id: '3',
    imgSrc: 'img/apartment-small-03.jpg',
    mark: 'Luxury',
    priceValue: 250,
    priceText: 'night',
    description: 'Spacious penthouse with panoramic views',
    type: 'Penthouse',
  },
  {
    id: '4',
    imgSrc: 'img/apartment-small-04.jpg',
    mark: 'Budget',
    priceValue: 80,
    priceText: 'night',
    description: 'Budget room near the subway station',
    type: 'Room',
  },
  {
    id: '5',
    imgSrc: 'img/apartment-small-03.jpg',
    mark: 'Top Rated',
    priceValue: 200,
    priceText: 'night',
    description: 'Comfortable 2-bedroom apartment with amenities',
    type: 'Apartment',
  },
];

// mocks.ts
export const favoriteCities = [
  {
    cityName: 'Amsterdam',
    places: favoritePlaces
  },
  {
    cityName: 'Cologne',
    places: favoritePlaces
  },
  {
    cityName: 'Paris',
    places: favoritePlaces
  },
];

