import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { TileLayer, MapContainer, Popup, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import Button from './Button';
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {isLoading:isLoadingPosition,position:geoLocationPosition,getPosition}= useGeoLocation()
const[mapLat,mapLng] = useUrlPosition();
useEffect(()=>{

  if(mapLat && mapLng ) setMapPosition([mapLat,mapLng])
},[mapLat,mapLng])

useEffect(() =>{
  if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
},[geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      { !geoLocationPosition &&
        (<Button type="position" onClick={getPosition}> {isLoadingPosition?'Loading...' : 'Use your position'}</Button>)}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter ({position}){
  const map=useMap();

  map.setView(position,)

  return null;
}

function DetectClick() {
 const navigate = useNavigate();
  useMapEvents({click: e =>
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  
  })
}