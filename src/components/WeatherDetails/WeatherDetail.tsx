import { Weather } from "../../hooks/useWeather"
import { formatTemperature, formatTime } from "../../utils"
import styles from "./WeatherDetail.module.css"

type WeatherDetailProps = {
    weather: Weather
}
export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (<>
    <div className={styles.container}>
        <h2 className="">Weather from: {weather.name}</h2>
        <p className={styles.description}>{weather.weather[0].description}</p>
        <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>

        <div className={styles.container}>

        <div className={styles.temperatures}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
            <p>Feels Like: <span>{formatTemperature(weather.main.feels_like)}&deg;C</span></p>
            <p>Humidity: <span>{weather.main.humidity}%</span></p>
            <p>Wind: <span>{weather.wind.speed}km/h;</span></p>
            </div>
        </div>

      <div className="">
        <div className={styles.sunny}>
          <p>Sunrise: <span>{formatTime(weather.sys.sunrise)}</span></p>
          <p>Sunset: <span>{formatTime(weather.sys.sunset)}</span></p>
        </div>
      </div>
    </div>


  </>
  )
}
