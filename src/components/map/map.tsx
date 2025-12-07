import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useMemo, useRef} from 'react';
import useMap from '../../hooks/use-map.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer.ts';
import {getCurrentCity} from '../../store/settings-process/selectors.ts';


type mapProps = {
  locations: Offer[];
  activeId: string | null;
  className: string;
}

function Map({locations, activeId, className}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);
  const currentCity = useAppSelector(getCurrentCity);
  const map = useMap(mapRef, currentCity.location);

  const defaultCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  const currentCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  useEffect(() => {
    if (map) {
      if (!markersLayerRef.current) {
        markersLayerRef.current = leaflet.layerGroup().addTo(map);
      }
      const layer = markersLayerRef.current;
      layer.clearLayers();
      locations.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: offer.id === activeId ? currentCustomIcon : defaultCustomIcon,
            }
          )
          .addTo(layer);
      });
    }
  }, [map, locations, activeId, defaultCustomIcon, currentCustomIcon]);

  return (
    <section className={`${className}__map`} ref={mapRef}></section>
  );
}

export default Map;
