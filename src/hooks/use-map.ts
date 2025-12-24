import leaflet from 'leaflet';
import {RefObject, useEffect, useRef, useState} from 'react';
import {Location} from '../types/location.ts';
import {MAP_TILE_LAYER_ATTRIBUTION, MAP_TILE_LAYER_URL} from '../const.ts';

function useMap(mapRef: RefObject<HTMLDivElement>, city: Location) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(
          MAP_TILE_LAYER_URL,
          {
            attribution: MAP_TILE_LAYER_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [city.latitude, city.longitude, city.zoom, mapRef]);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.latitude,
          lng: city.longitude,
        },
        city.zoom,
      );
    }
  }, [map, city]);

  return map;
}

export default useMap;
