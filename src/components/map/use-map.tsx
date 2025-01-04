import React, { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { Location } from '../../types/location.ts';

export function useMap(mapRef: React.RefObject<null>, location: Location) {
  const [map, setMap] = useState<leaflet.Map>();
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.location.latitude,
          lng: location.location.longitude,
        },
        zoom: location.location.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
        .addTo(instance);
      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}
