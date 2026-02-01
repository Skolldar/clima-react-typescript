import WeatherDetail from "./components/WeatherDetails/WeatherDetail"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"
import Header from "./components/Dashboard/Header"

const App = () => {

  const  {weather, hourlyWeather, notFound, fetchWeather, hasWeatherData} = useWeather()

  return (
    <>
    <main className="p-4 md:p-10 lg:p-20 space-y-2">
    <Header fetchWeather={fetchWeather} />
      {hasWeatherData && <WeatherDetail weather={weather} hourlyWeather={hourlyWeather}/>}
        {notFound && <Alert>City not found</Alert>}
    </main>
    </>
  )
}

export default App