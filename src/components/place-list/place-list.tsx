import PlaceCard from '../place-card/place-card.tsx';
import {useAppSelector} from '../../hooks';
import getSortedOffers from '../../infrastructure/get-sorted-offers.ts';

type placeListProps = {
  onListItemHover: (id: string | null) => void;
}

function PlaceList({onListItemHover}: placeListProps) {
  const currentState = useAppSelector((state) => state);
  const places = getSortedOffers(currentState.offers, currentState.sorting);

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <PlaceCard
          id={place.id}
          key={place.id}
          previewImage={place.previewImage}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          price={place.price}
          title={place.title}
          type={place.type}
          onMouseEnter={() => onListItemHover(place.id)}
          onMouseLeave={() => onListItemHover(null)}
          className={'cities'}
        />
      ))}
    </div>
  );
}

export default PlaceList;
