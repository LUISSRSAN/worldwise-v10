
import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));



export default function CityItem({city}) {
  const {currentCity} = useCities();

const {cityName,emoji,date,id,position} = city; 
  function handleClick(e){
    e.preventDefault();
    console.log("TEST");
  }
return (

<li className = {`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : " "}`}>
  <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng${position.lng}`}>
<span className ={styles.emoji} >{}</span>
<h3 className={styles.name}>{cityName} </h3>
<time className = {styles.date} >({formatDate(date)})</time>
<button className={styles.deleteBtn} onClick={handleClick} > &times;</button>
</Link>
    </li>

  );
}
