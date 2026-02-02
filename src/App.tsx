import WeatherDetail from "./components/WeatherDetails/WeatherDetail"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"
import Header from "./components/Dashboard/Header"
import Spinner from "./components/Spinner/Spinner"
import { useEffect, useState } from "react"
import Bar from "./components/Dashboard/Bar"

const App = () => {

  const  {weather, hourlyWeather, notFound, fetchWeather, fetchWeatherByLocation, hasWeatherData, loading} = useWeather()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    fetchWeatherByLocation()
  }, [])

  return (
    <>
    <main className={`${isDarkMode ? 'dark-bg' : 'light-bg'} p-10 flex min-h-screen`}>
      <div className="w-80">
        <Bar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      <div className="flex-1 m-5 px-8 space-y-10">
        <Header fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {!loading && hasWeatherData && <WeatherDetail weather={weather} hourlyWeather={hourlyWeather}/>}
        {notFound && <Alert>City not found</Alert>}
      </div>
    </main>
    </>
  )
}

export default App