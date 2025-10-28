import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.ts';
import {Location} from '../../types/location.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const.ts';


type mapProps = {
  locations: Location[];
  city: Location;
  selectedPoint: Location | null;
}

function Map({locations, city, selectedPoint}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      locations.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (selectedPoint && point.longitude === selectedPoint.longitude && point.latitude === selectedPoint.latitude)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, locations, defaultCustomIcon, selectedPoint, currentCustomIcon]);

  return (
    <div className="cities__right-section" ref={mapRef}>
    </div>
  );
}

export default Map;
