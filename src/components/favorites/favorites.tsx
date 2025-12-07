import CityFavorites from '../city-favorites/city-favorites.tsx';
import {useAppSelector} from '../../hooks';
import {getFavoritesByCity} from '../../store/offers-process/selectors.ts';

function Favorites(): JSX.Element {
  const placesByCity = useAppSelector(getFavoritesByCity);

  return (
    <ul className="favorites__list">
      {Object.entries(placesByCity).map(([city, cityPlaces]) => (
        <CityFavorites city={city} places={cityPlaces} key={city}/>
      ))}
    </ul>
  );
}

export default Favorites;
