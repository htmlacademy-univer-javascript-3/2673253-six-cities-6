import CityFavorites from '../city-favorites/city-favorites.tsx';
import {Offer} from '../../types/offer.ts';
import {useAppSelector} from '../../hooks';

function Favorites(): JSX.Element {
  const places = useAppSelector((state) => state.favoriteOffers);
  const placesByCity = places.reduce<Record<string, Offer[]>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  return (
    <ul className="favorites__list">
      {Object.entries(placesByCity).map(([city, cityPlaces]) => (
        <CityFavorites city={city} places={cityPlaces} key={city}/>
      ))}
    </ul>
  );
}

export default Favorites;
