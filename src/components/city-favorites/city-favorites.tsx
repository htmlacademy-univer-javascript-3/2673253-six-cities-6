import {Offer} from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type cityFavoritesProps = {
  city: string;
  places: Offer[];
}
function CityFavorites({city, places}: cityFavoritesProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            offer={place}
            className="favorites"
            infoWrapperClassName="favorites__card-info"
          />
        ))}
      </div>
    </li>
  );
}

export default CityFavorites;
