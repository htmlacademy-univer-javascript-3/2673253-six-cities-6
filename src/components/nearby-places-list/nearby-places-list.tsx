import PlaceCard from '../place-card/place-card.tsx';
import {useAppSelector} from '../../hooks';
import {getOffersNearby} from '../../store/offers-process/selectors.ts';
import {NEARBY_OFFERS_LIMIT} from '../../const.ts';


function NearbyPlacesList() {
  const places = useAppSelector(getOffersNearby).slice(0, NEARBY_OFFERS_LIMIT);

  return (
    <div className="near-places__list places__list">
      {places.map((place) => (
        <PlaceCard
          offer={place}
          key={place.id}
          onHover={() => undefined}
          className={'near-places'}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
