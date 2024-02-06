// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import Button from "./Button.jsx";
import styles from "./Form.module.css";
import {useUrlPosition} from "../hooks/useUrlPosition";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



 function convertToEmoji(countryCode) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";



function Form() {
  const [Lat,Lng] = useUrlPosition();
const {createCity,isLoading} = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
const [emoji,setEmoji ]= useState();
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false);
const [geocodingError,setGeocodingError]= useState();


useEffect(
  function(){
    if(!lat && !lng)return ;
  }
)



  useEffect(function (){
async function fetchCityData(){
  try{
    setGeocodingError("");
setIsLoadingGeocoding(true);
const res = await fetch (`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
const data = await res.json();
console.log(data);

if (!data.countryCode) throw new Error ('That doesnt seem to be a city. Click somewhere else');


setCityName(data.city || data.locality || "");
setCountry(data.countryName);
setEmoji(convertToEmoji(data.countryCode));

  }catch (err){
setGeocodingError(err.message);
  }finally{
    setIsLoadingGeocoding(false);
    
  }
}
  },[lat,lng]);

function handleSubmit(e){
e.preventDefault();

if (!cityName || !date)return;
const newCity = {
  cityName,
  country,
  date,
  notes,
  position:{lat,lng}
};
createCity(newCity);
navigate("/app/cities");

}
if (isLoadingGeocoding) return <Spinner/>;

if(!lat &&  !lng) return <Message messge ="Stary by clicking on the map"/>;

  if (geocodingError) return <Message message={geocodingError}/>;
  return (
    <form className={`{styles.form} ${isLoading ? styles.loading:""}}`} onSubmit={handleSubmit} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
       
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/*<input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        >
*/}


  <DatePicker onChange={date=>setDate(date)}
  selected={date}
   dateFormat = 'dd/MM/yyyy'

  />
      </div>
    

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        
       
      </div>
    </form>
  );
}

export  {Form ,convertToEmoji};
