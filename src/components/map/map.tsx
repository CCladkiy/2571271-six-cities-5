import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { DEFAULT_CUSTOM_ICON, CURRENT_CUSTOM_ICON } from '../../constants/constants.ts';
import { useEffect, useRef } from 'react';
import { Location } from '../../types/location.ts';
import { Nullable } from 'vitest';
import { useMap } from './use-map.tsx';

type MapProps = {
  city: Location;
  selectedPoint: Nullable<Location>;
  points: Location[];
  className?: string;
}

export function Map({city, selectedPoint, points, className}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      map.setView({ lat: city.location.latitude, lng: city.location.longitude}, city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      points.forEach((loc) => {
        leaflet.marker({
          lat: loc.location.latitude,
          lng: loc.location.longitude
        },
        {
          icon: loc.name === selectedPoint?.name
            ? CURRENT_CUSTOM_ICON
            : DEFAULT_CUSTOM_ICON,
        })
          .addTo(map);
      });
    }
  }, [map, points]);

  return <div style={{height: '100%'}} ref={mapRef} className={className}></div>;
}
