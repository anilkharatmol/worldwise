import styles from './CountriesList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../context/CitiesContext'

export default function CountriesList () {

    const {cities,isLoading} =useCities();

    if(isLoading) return <Spinner/>

    if(!cities.length)
        return(
    <Message message="Add your first city by clicking a city on the map"/>)

    const countries =cities.reduce((arr,city) =>{
        if(!arr.map(el=>el.country).includes(city.country))
        {
            return [...arr,{country:city.country,emoji:city.emoji}]
        }
        else {
            return arr;
        }
    },[])

  return (
    <ul className={styles.countriesList}>
     {countries.map((country)=>( 
        <CountryItem country={country} key={country.emoji}/>
        ))}
    </ul>
  )
};
