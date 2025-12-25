import CityFavorites from '../city-favorites/city-favorites.tsx';
import {useAppSelector} from '../../hooks';
import {getFavoritesByCity} from '../../store/offers-process/selectors.ts';

function Favorites(): JSX.Element {
  const placesByCity = useAppSelector(getFavoritesByCity);
  const groupedFavorites = Object.entries(placesByCity);

  if (groupedFavorites.length === 0) {
    return (
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    );
  }

  return (
    <ul className="favorites__list">
      {groupedFavorites.map(([city, cityPlaces]) => (
        <CityFavorites city={city} places={cityPlaces} key={city}/>
      ))}
    </ul>
  );
}

export default Favorites;
