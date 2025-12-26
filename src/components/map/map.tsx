import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useMemo, useRef} from 'react';
import useMap from '../../hooks/use-map.ts';
import {MAP_ICON_ANCHOR, MAP_ICON_SIZE, URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getCurrentCity} from '../../store/settings-process/selectors.ts';
import {MapPoint} from '../../types/map-point.ts';


type mapProps = {
  locations: MapPoint[];
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
    iconSize: MAP_ICON_SIZE,
    iconAnchor: MAP_ICON_ANCHOR,
  }), []);

  const currentCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: MAP_ICON_SIZE,
    iconAnchor: MAP_ICON_ANCHOR,
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
