import { useState } from 'react';
import { Nullable } from 'vitest';

import { Location } from '../../types/location.ts';
import { CitiesCardList } from '../../components/place-card/place-card-list.tsx';
import { OfferList } from '../../types/offer-list.ts';
import { Map } from '../../components/map/map.tsx';
import { Sorting } from '../../components/sorting/sorting.tsx';

type OfferListProps = {
  offers: OfferList[];
  city: Location;
};

export function OfferListMainPage({ offers, city }: OfferListProps) {
  const [selectedId, setSelectedId] = useState<Nullable<string>>();

  const points = offers.map((o) => ({ name: o.id, location: o.location }));
  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {city.name}
        </b>
        {<Sorting/>}
        <div className="cities__places-list places__list tabs__content">
          <CitiesCardList offers={offers} onItemHover={setSelectedId} />
        </div>
      </section>
      <div className="cities__right-section">
        {city && (
          <Map
            city={city}
            points={points}
            selectedPoint={points.find((p) => p.name === selectedId)}
            className="cities__map"
          />
        )}
      </div>
    </>
  );
}

export function EmptyOfferList({ city }: { city: string }) {
  return (
    <>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in {city}
          </p>
        </div>
      </section>
      <div className="cities__right-section" />
    </>
  );
}
