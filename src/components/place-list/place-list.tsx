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
          id={place.id}
          key={place.id}
          previewImage={place.previewImage}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          price={place.price}
          title={place.title}
          type={place.type}
          onHover={onListItemHover}
          className={'cities'}
        />
      ))}
    </div>
  );
}

export default PlaceList;
