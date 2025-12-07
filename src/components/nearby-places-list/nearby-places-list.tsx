import PlaceCard from '../place-card/place-card.tsx';
import {useAppSelector} from '../../hooks';
import {getOffersNearby} from '../../store/offers-process/selectors.ts';

type NearbyPlacesListProps = {
  onListItemHover: (id: string | null) => void;
}

function NearbyPlacesList({onListItemHover}: NearbyPlacesListProps) {
  const places = useAppSelector(getOffersNearby);

  return (
    <div className="near-places__list places__list">
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
          onHover={onListItemHover}
          className={'near-places'}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
