import styles from "./CountryList.module.css"
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";

import CountryItem from './CountryItem.jsx'
import Message from "./Message.jsx"
import {useCities} from "./contexts/CitiesContext";

export default function CountryList() {


  const {citites,isLoading} = useCities();

    if (isLoading)return <Spinner/>;

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />


const countries = cities.reduce((arr,city ) => {
     if(!arr.map(el=>el.country).includes(city.country))
         return [...arr,{country:city.country,emoji:city.emoji}];


else {return arr;}
}
,[] );


  return (
    <div>
      <ul className ={styles.countriesList}>
{countries.map((country) => <CountryItem city={country} key={country.country}/> )}


      </ul>

    </div>
  );
}