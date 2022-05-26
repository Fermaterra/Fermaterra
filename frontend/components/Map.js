import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px"
};

function Map({ location }) {
  const center = {
    lat: location.lat,
    lng: location.lng
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.MAP_API_KEY}`
  });
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
    >
      <Marker
        position={center}
      />
    </GoogleMap>
  ) : null;
}

export default Map;
