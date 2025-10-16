import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import places from './mocks/offer.ts';
import {favoriteCities} from './mocks/favorites.ts';

const Setting = {
  PlacesCount: 5,
  Places: places,
  CityList: favoriteCities
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Setting.PlacesCount} places={Setting.Places} cities={Setting.CityList} />
  </React.StrictMode>
);
