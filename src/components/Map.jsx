import styles from "./Map.module.css";
import {useSearchParams,useNavigate} from "react-router-dom";
import {MapContainer,TileLayer,Marker} from "react-leaflet";
import { useGeolocation} from "../hooks/useGeolocation.js";
import {useUrlPosition} from "../hooks/useUrlPosition.js";

import Button from "./Button.jsx";

export default function Map() {
  const   navigate = useNavigate();
const [mapPosition,setMapPosition] = useState([40,0]);
const {cities} = useCities();
const [searchParams] = useSearchParams();
const {isLoading:isLoadingPosition,
  position:geolocationPosition,
getPosition} = useGeolocation();
const [mapLat,mapLng] = useUrlPosition();
const lat = searchParams.get('lat');
const lng = searchParams.get('lng');

useEffect(function(){
if(mapLat &&mapLng)setMapPosition([mapLat,mapLng]);
},
[mapLat,mapLng]
)


useEffect(function(){
if (geolocationPosition) setMapPosition
([geolocationPosition.lat,geolocationPositiion.lng]);
},[geolocationPosition])
  return (
    <div className = {styles.mapContainer}
    onClick={()=> navigate("form")} >

      <h1>Map</h1>
      <h1>Position: {lat},{lng}</h1>
      <button onClick={()=> {
        setSearchParams({lat:23,lng: 50})
      }
      }>Change pos</button>

{!geolocationPosition && (<Button type="position" onClick={getPosition}>
{isLoadingPosition? "Loading...": "Use your position"}

</Button>
   )}
<MapContainer 

center = {mapPosition}

//center={[mapLat,mapLng]
//} 
className={styles.map} 
zoom={6} 
scrollWheelZoom={true }

>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot{z}/{x}/{y}.png"
    />
    {cities.map((city)=> ( <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji} </span><span>{city.cityName}</span>
      </Popup>
    </Marker>
))}
<ChangeCenter position = {mapPosition}/>
<DetectClick/>
  </MapContainer>
    </div>
  );
}


function ChangeCenter({position}){
const map = useMap()
map.setView(position);
return null;

}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click: (e) =>
    
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng}`),
  });

}
