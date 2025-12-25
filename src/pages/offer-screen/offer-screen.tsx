import ReviewForm from '../../components/review-form/review-form.tsx';
import {Navigate, useParams} from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import Map from '../../components/map/map.tsx';
import {useCallback, useEffect, useState} from 'react';
import NearbyPlacesList from '../../components/nearby-places-list/nearby-places-list.tsx';
import {changeFavoritesStatusAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction} from '../../store/api-actions.ts';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import {
  getCurrentOffer,
  getCurrentReviews,
  getIsOfferDataLoading,
  getIsOffersNearbyDataLoading,
  getIsReviewsDataLoading,
  getOffersNearby
} from '../../store/offers-process/selectors.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {redirectToRoute} from '../../store/actions.ts';
import {getRatingWidth} from '../../utils/get-rating-width.ts';

function OfferScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchOffersNearbyAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  const offer = useAppSelector(getCurrentOffer);
  const reviews = useAppSelector(getCurrentReviews);
  const offersNearby = useAppSelector(getOffersNearby);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const isOfferDataLoading = useAppSelector(getIsOfferDataLoading);
  const isOffersNearbyDataLoading = useAppSelector(getIsOffersNearbyDataLoading);
  const isReviewsDataLoading = useAppSelector(getIsReviewsDataLoading);

  const handleBookmarkClick = useCallback(() => {
    if (!offer) {
      return;
    }

    if (!isAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    const newStatus = offer.isFavorite ? FavoriteStatus.Out : FavoriteStatus.In;

    dispatch(changeFavoritesStatusAction({
      offerId: offer.id,
      status: newStatus,
    }));
  }, [dispatch, isAuth, offer]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isOfferDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isOffersNearbyDataLoading || isReviewsDataLoading) {
    return (
      <LoadingScreen/>
    );
  }
  return (
    <div className="page">
      <Header isMain={false}/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offer.images.map((picture) => (
                  <div className="offer__image-wrapper" key={picture}>
                    <img className="offer__image" src={picture} alt="Photo studio"/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>

              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`
                    offer__bookmark-button
                    button
                    ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}
                  `}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRatingWidth(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    offer.goods.map((elem) => (
                      <li className="offer__inside-item" key={elem}>
                        {elem}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                  >
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {
                    offer.host.isPro &&
                    <span className="offer__user-status">
                    Pro
                    </span>
                  }

                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                {isAuth && (
                  <ReviewForm offerId={id}/>
                )}
              </section>
            </div>
          </div>
          <Map locations={offersNearby} activeId={activeId} className="offer"/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyPlacesList onListItemHover={setActiveId}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
