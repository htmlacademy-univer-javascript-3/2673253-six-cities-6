import {Link} from 'react-router-dom';
import {AppRoute, DEFAULT_SORTING} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import {changeCity, changeSorting} from '../../store/settings-process/settings-process';
import Cities from '../../mocks/cities.ts';
import {Offer} from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

type cityFavoritesProps = {
  city: string;
  places: Offer[];
}
function CityFavorites({city, places}: cityFavoritesProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = () => {
    const cityData = Cities.find(({name}) => name === city);
    if (!cityData) {
      return;
    }

    dispatch(changeCity(cityData));
    dispatch(changeSorting(DEFAULT_SORTING));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} onClick={handleCityClick}>
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
