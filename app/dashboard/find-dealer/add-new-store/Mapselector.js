import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapSelector = ({ onSelectPosition }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onSelectPosition(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
      const geocoder = L.Control.Geocoder.nominatim();
      const control = L.Control.geocoder({
        geocoder,
        defaultMarkGeocode: false,
      })
        .on("markgeocode", function (e) {
          const bbox = e.geocode.bbox;
          const poly = L.polygon([
            [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
            [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
            [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
            [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
          ]);
          map.fitBounds(poly.getBounds());
          setPosition(e.geocode.center);
          onSelectPosition(e.geocode.center);
        })
        .addTo(map);

      return () => {
        map.removeControl(control);
      };
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
      <SearchControl />
    </MapContainer>
  );
};

export default MapSelector;
