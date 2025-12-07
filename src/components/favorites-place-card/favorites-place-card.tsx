import {Link} from 'react-router-dom';
import {memo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoritesStatusAction} from '../../store/api-actions.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../../const.ts';
import {redirectToRoute} from '../../store/actions.ts';

type FavoritesPlaceCardProps = {
  id: string;
  title: string;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  price: number;
  type: string;
}

function FavoritesPlaceCardComponent({id, title, previewImage, isPremium, isFavorite, price, type}: FavoritesPlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleBookmarkClick = useCallback(() => {
    if (!isAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const newStatus = isFavorite ? FavoriteStatus.Out : FavoriteStatus.In;

    dispatch(changeFavoritesStatusAction({
      offerId: id,
      status: newStatus,
    }));
  }, [dispatch, id, isFavorite, isAuth]);

  return (
    <article className='favorites__card place-card'>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`
              place-card__bookmark-button
              button
              ${isFavorite ? 'place-card__bookmark-button--active' : ''}
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
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const FavoritesPlaceCard = memo(FavoritesPlaceCardComponent);

export default FavoritesPlaceCard;
