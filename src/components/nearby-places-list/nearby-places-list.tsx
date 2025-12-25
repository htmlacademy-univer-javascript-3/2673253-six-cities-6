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
          offer={place}
          key={place.id}
          onHover={onListItemHover}
          className={'near-places'}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
