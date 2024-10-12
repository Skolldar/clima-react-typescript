import styles from "./App.module.css"
import Form from "./components/Form/Form"
import Spinner from "./components/Spinner/Spinner"
import WeatherDetail from "./components/WeatherDetails/WeatherDetail"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"

const App = () => {

  const  {weather, loading, notFound, fetchWeather, hasWeatherData} = useWeather()

  return (
    <>
    <h1 className={styles.tittle}>Weather Search</h1>

    <div className={styles.container}>
      <Form fetchWeather={fetchWeather}/>
      {loading && <Spinner/>}
      {hasWeatherData && <WeatherDetail weather={weather}/>}
      {notFound && <Alert>City not found</Alert>}

    </div>
    </>
  )
}

export default App