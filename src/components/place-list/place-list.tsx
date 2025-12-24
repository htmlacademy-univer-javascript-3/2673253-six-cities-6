import PlaceCard from '../place-card/place-card.tsx';
import {useAppSelector} from '../../hooks';
import {getSortedOffers} from '../../store/offers-process/selectors.ts';

type placeListProps = {
  onListItemHover: (id: string | null) => void;
}

function PlaceList({onListItemHover}: placeListProps) {
  const places = useAppSelector(getSortedOffers);

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <PlaceCard
          offer={place}
          key={place.id}
          onHover={onListItemHover}
          className={'cities'}
        />
      ))}
    </div>
  );
}

export default PlaceList;
