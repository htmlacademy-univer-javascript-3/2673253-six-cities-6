import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {changeFavoritesStatusAction} from '../../store/api-actions.ts';

type PlaceCardProps = {
  id: string;
  title: string;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  price: number;
  type: string;
  className: string;
}

function PlaceCard(props : PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleBookmarkClick = () => {
    const newStatus = props.isFavorite ? 0 : 1;

    dispatch(changeFavoritesStatusAction({
      offerId: props.id,
      status: newStatus,
    }));
  };

  return (
    <article className={`${props.className}__card place-card`}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${props.className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${props.id}`}>
          <img className="place-card__image" src={props.previewImage} width="260" height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`
              place-card__bookmark-button
              button
              ${props.isFavorite ? 'place-card__bookmark-button--active' : ''}
            `}
          type="button"
          onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.title}</a>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
