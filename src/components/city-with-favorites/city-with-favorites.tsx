import FavoritePlaceList from '../favorite-place-list/favorite-place-list.tsx';
import {Place} from '../../types';

type cityWithFavoritesProps = {
  city: string;
  places: Place[];
}
function CityWithFavorites({city, places}: cityWithFavoritesProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <FavoritePlaceList places={places}/>
    </li>
  );
}

export default CityWithFavorites;
