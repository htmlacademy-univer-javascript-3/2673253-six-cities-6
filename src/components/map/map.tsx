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
  className: string;
}

function Map(props: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, props.city);

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
      props.locations.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (props.selectedPoint && point.longitude === props.selectedPoint.longitude && point.latitude === props.selectedPoint.latitude)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, props.locations, defaultCustomIcon, props.selectedPoint, currentCustomIcon]);

  return (
    <section className={props.className} ref={mapRef}></section>
  );
}

export default Map;
