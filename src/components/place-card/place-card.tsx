import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Nullable } from 'vitest';
import { memo } from 'react';

import { CardTypes } from '../../constants/constants.ts';
import { OfferList } from '../../types/offer-list.ts';
import { AppRoutes } from '../../constants/constants.ts';
import { Stars } from '../stars/stars.tsx';
import { RatingClasses } from '../../constants/constants.ts';
import { CardBookmark } from './bookmark.tsx';


type PlaceCardProps = OfferList & {
  cardType: CardTypes;
  onHover?: (id: Nullable<string>) => void;
  width: number;
  height: number;
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
  onHover,
  width,
  height
}: PlaceCardProps) {
  const singleOfferUrl = AppRoutes.Offer.replace(':id', id);

  return (
    <article className={cn('place-card', {
      'cities__card': cardType === CardTypes.Cities,
      'favorites__card': cardType === CardTypes.Favorites,
      'near-places__card': cardType === CardTypes.Near
    })}
    onMouseLeave={() => onHover?.call(null, null)}
    onMouseOver={() => onHover?.call(null, id)}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={cn('place-place-card__image-wrapper', {
        'cities__image-wrapper': cardType === CardTypes.Cities,
        'favorites__image-wrapper': cardType === CardTypes.Favorites,
        'near-places__image-wrapper': cardType === CardTypes.Near
      })}
      >
        <Link to={singleOfferUrl}>
          <img
            className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
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
          <CardBookmark offerId={id} isFavorite={isFavorite} />
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

export const MemoPlaceCard = memo(PlaceCard);
