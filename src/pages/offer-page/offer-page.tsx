import 'leaflet/dist/leaflet.css';
import styles from './offerMap.module.css';

import { OfferGoods } from './offer-goods.tsx';
import { CommentList } from '../../components/comments/comment-list.tsx';
import { CommentForm } from '../../components/comments/comment-form.tsx';
import { Stars } from '../../components/stars/stars.tsx';
import { RatingClasses } from '../../constants/constants.ts';
import { Map } from '../../components/map/map.tsx';
import { NearbyCardList } from '../../components/place-card/place-card-list.tsx';
import { OfferBookmark } from '../../components/place-card/bookmark.tsx';
import { AppRoutes } from '../../constants/constants.ts';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { useOfferPage } from './use-offer-page.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { AuthStatus } from '../../constants/constants.ts';
import { clearOffer } from '../../slices/current-offer-slice.ts';

export function OfferPage() {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const { offer, comments, nearbyOffers, error, isLoading } = useOfferPage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error !== undefined || (!isLoading && offer === undefined)) {
      navigate(AppRoutes.NotFound);
    }
  }, [error, navigate, offer, isLoading]);
  useEffect(
    () => () => {
      dispatch(clearOffer());
    },
    [dispatch]
  );
  if (isLoading || offer === undefined) {
    return <Spinner />;
  }

  const offerLocation = {name: offer.id, location: offer.location};

  const displayedOffers = nearbyOffers
    .filter((off) => off.id !== offer.id)
    .slice(0, 3);

  const nearPoints = displayedOffers
    .map((off) => ({name: off.id, location: off.location}))
    .concat(offerLocation);

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <OfferBookmark offerId={offer.id} isFavorite={offer.isFavorite} />
              </div>
              <Stars rating={offer.rating} isValueHidden={false} ratingClass={RatingClasses.Offer}/>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferGoods items={offer.goods}/>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <CommentList comments={comments}/>
                {authStatus === AuthStatus.Auth && <CommentForm />}
              </section>
            </div>
          </div>
          <div className={styles['offer__map-wrapper']}>
            <Map
              city={offer.city}
              points={nearPoints}
              selectedPoint={offerLocation}
              className="offer__map map"
            />
          </div>
        </section>
        <div className="container">
          <NearbyCardList
            offers={displayedOffers}
          />
        </div>
      </main>
    </div>
  );
}
