import { Weather, HourlyWeather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from "./WeatherDetail.module.css"
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import WeatherHours from "./WeatherHours";
import WeatherSunTime from "./WeatherSunTime";

type WeatherDetailProps = {
    weather: Weather
    hourlyWeather: HourlyWeather[]
  uvIndex?: number | null
}
export default function WeatherDetail({weather, hourlyWeather, uvIndex}: WeatherDetailProps) {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  
  // Convert Celsius to Fahrenheit
  const convertTemp = (celsius: number) => {
    if (isFahrenheit) {
      return Math.round((celsius * 9/5) + 32);
    }
    return formatTemperature(celsius);
  };
  
  const tempUnit = isFahrenheit ? 'F' : 'C';
  
  // Helper function to get weather icon
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    return desc.includes('cloud')
      ? '☁️'
      : desc.includes('rain') || desc.includes('drizzle')
      ? '🌧️'
      : desc.includes('snow')
      ? '❄️'
      : desc.includes('storm') || desc.includes('thunder')
      ? '⛈️'
      : '☀️'
  }

  // Convert wind speed from m/s to km/h
  const convertWindToKmh = (speedMs: number) => Math.round(speedMs * 3.6);

  // UV Index helper: 0 = low (green), 1 = moderate (yellow), 2 = high+ (red)
  const getUvCategory = (uv?: number | null) => {
    if (uv == null) return -1
    if (uv < 3) return 0
    if (uv < 7) return 1
    return 2
  }

  const uvCat = getUvCategory(uvIndex)

  return (
    <>
    <div className="grid lg:grid-cols-2 lg:gap-10 gap-4 grid-cols-1 space-y-2 lg:space-y-8">
        <div className="blur-card">
          <div className="grid grid-cols-2 items-center justify-between py-3">
            <div className="flex items-center justify-start gap-2">
              <FaLocationDot size={20} className="text-primary" />
              <span className="text-xl font-semibold text-primary">{weather.name}, {weather.sys.country}</span>
            </div>
          <div className="flex flex-col items-end">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isFahrenheit}
                onChange={(e) => setIsFahrenheit(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="group peer ring-0 bg-linear-to-r from-sky-600 to-sky-700 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-linear-to-r peer-checked:from-teal-600 peer-checked:to-teal-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-hover:after:scale-95 after:z-10">
                <span className="absolute top-3 left-3 text-white font-bold text-lg z-0">°F</span>
                <span className="absolute top-3 right-3 text-white font-bold text-lg z-0">°C</span>
              </div>
            </label>
          </div> 
      </div>
          <div className={styles.container}>
            <div className="grid text-primary grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
              <div>
                <p className={`py-4 ${styles.description}`}>{weather.weather[0].description}</p>
                <div className="flex items-center gap-4">
                  <p className={`py-8 ${styles.current}`}>{convertTemp(weather.main.temp)}&deg;{tempUnit}</p>
                    <div className="text-8xl mb-8 ml-8 md:hidden">{getWeatherIcon(weather.weather[0].description)}</div>
                </div>
                <span className="font-semibold md:hidden flex">Feels:<span className="ml-2 font-normal">{convertTemp(weather.main.feels_like)}&deg;{tempUnit}</span></span>
              <div className="flex text-primary gap-2 items-center justify-start mt-2">
                  <span className="font-bold">Min: </span><span>{convertTemp(weather.main.temp_min)}&deg;{tempUnit}</span>
                  <span className="font-bold">Max: </span><span>{convertTemp(weather.main.temp_max)}&deg;{tempUnit}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="lg:text-[10rem] text-5xl lg:py-10 py-4 text-primary hidden md:block">
                  {
                    getWeatherIcon(weather.weather[0].description)
                  }
                </div>
                  <p className=" gap-2 pt-4 md:pt-12 justify-start hidden md:justify-center items-center">
                    <span>{convertTemp(weather.main.feels_like)}&deg;{tempUnit}</span>
                  </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blur-card">
          <h2 className="text-left text-primary font-semibold pb-4">Today Highlight</h2>
          <div className="grid gap-6 text-primary sm:grid-cols-2">
            <div className="bg-white/50 shadow-md p-8 rounded-xl flex flex-col items-center">
                <h3 className="text-2xl">Wind</h3>
              <div className="mb-4 flex items-center justify-center">
                <img src="../wind.png" alt="Wind" className='w-29 h-29' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl font-semibold">{convertWindToKmh(weather.wind.speed)} km/h</p>
              </div>
            </div>
            <div className="bg-white/50 shadow-md p-4 rounded-xl flex flex-col items-center"> 
              <h3 className="text-2xl">UV Index</h3>
                  <div className="mt-3 flex flex-col items-center justify-center">
                  <div className="mb-2">
                    {uvCat === -1 ? (
                      <img src="../uv-low.png" alt="UV unknown" className="w-30 h-30 mx-auto" />
                    ) : uvCat === 0 ? (
                      <img src="../uv-low.png" alt="UV low" className="w-30 h-30 mx-auto" />
                    ) : uvCat === 1 ? (
                      <img src="../uv-medium.png" alt="UV medium" className="w-30 h-30 mx-auto" />
                    ) : (
                      <img src="../uv-high.png" alt="UV high" className="w-30 h-30 mx-auto" />
                    )}
                  </div>
                    <div className=" mt-4 text-center text-primary text-2xl font-semibold">{uvIndex == null ? 'UV: —' : `UV: ${uvIndex}`}</div>
                  </div>
            </div>
            <div className="bg-white/50 shadow-md p-4 rounded-xl flex flex-col items-center">
            <h3 className="text-2xl">Humidity</h3>
              <div className="mb-4 flex items-center justify-center">
                <img src="../humidity.png" alt="Humidity" className='w-29 h-29' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl mt-1 font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>
            <div className="bg-white/50 shadow-md p-4 rounded-xl flex flex-col items-center">
            <h3 className="text-2xl">Visibility</h3>
              <div className="mb-4 flex items-center justify-center">
                <img src="../fog.png" alt="Visibility" className='w-29 h-29' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl font-semibold">{weather.visibility} m</p>
              </div>
            </div>
          </div>
        </div>

          <WeatherHours 
          weather={weather} 
          hourlyWeather={hourlyWeather} 
          tempUnit={tempUnit} />

          <WeatherSunTime 
          weather={weather} />
        </div>
    </>
  )
}
