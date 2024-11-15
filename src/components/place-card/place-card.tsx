import { Link } from 'react-router-dom';
import { CardTypes } from '../../constants/constants.ts';
import cn from 'classnames';
import { OfferList } from '../../types/offer-list.ts';
import { AppRoutes } from '../../constants/constants.ts';
import { Stars } from '../stars/stars.tsx';
import { RatingClasses } from '../../constants/constants.ts';

type PlaceCardProps = OfferList & {
  cardType: CardTypes;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export function PlaceCard({
  id,
  isPremium,
  previewImage,
  price,
  rating,
  title,
  type,
  isFavorite,
  cardType,
  onMouseLeave,
  onMouseOver
}: PlaceCardProps) {

  const singleOfferUrl = AppRoutes.Offer.replace('id', id);

  return (
    <article className={cn('place-card', {
      'cities__card': cardType === CardTypes.Cities,
      'favorites__card': cardType === CardTypes.Favorites,
    })}
    onMouseLeave={onMouseLeave}
    onMouseOver={onMouseOver}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={cn('place-place-card__image-wrapper', {
        'cities__image-wrapper': cardType === CardTypes.Cities,
        'favorites__image-wrapper': cardType === CardTypes.Favorites,
      })}
      >
        <Link to={singleOfferUrl}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === CardTypes.Cities ? 260 : 150}
            height={cardType === CardTypes.Cities ? 200 : 110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cn('place-card__info', {'favorites__card-info': cardType === CardTypes.Cities})}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <Stars rating={rating} ratingClass={RatingClasses.PlaceCard} isValueHidden/>
        <h2 className="place-card__name">
          <Link to={singleOfferUrl}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
