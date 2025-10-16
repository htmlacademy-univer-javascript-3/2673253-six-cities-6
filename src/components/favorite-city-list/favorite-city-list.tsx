import {CityPlaces} from '../../types';
import CityWithFavorites from '../city-with-favorites/city-with-favorites.tsx';

type favoriteCityListProps = {
  cities: CityPlaces[];
}

function FavoriteCityList({cities} : favoriteCityListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <CityWithFavorites city={city.cityName} places={city.places}/>
      ))}
    </ul>
  );
}

export default FavoriteCityList;
