import WeatherDetail from "./components/WeatherDetails/WeatherDetail"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"
import Header from "./components/Dashboard/Header"
import Spinner from "./components/Spinner/Spinner"
import { useEffect, useState } from "react"
import Bar from "./components/Dashboard/Bar"

const App = () => {

  const  {weather, hourlyWeather, notFound, fetchWeather, fetchWeatherByLocation, hasWeatherData, loading, uvIndex} = useWeather()
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme !== null) {
      return savedTheme === 'dark'
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      return newMode
    })
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
        <div className="mt-10">
        {loading && <Spinner />}
        {!loading && hasWeatherData && <WeatherDetail weather={weather} hourlyWeather={hourlyWeather} uvIndex={uvIndex} />}
        {notFound && <Alert>City not found</Alert>}
        </div>
      </div>
    </main>
    </>
  )
}

export default App