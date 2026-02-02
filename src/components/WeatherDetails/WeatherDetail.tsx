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
}
export default function WeatherDetail({weather, hourlyWeather}: WeatherDetailProps) {
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

  // Calculate chance of rain from hourly forecast
  const chanceOfRain = hourlyWeather.length > 0 && hourlyWeather[0].pop !== undefined
    ? `${Math.round(hourlyWeather[0].pop * 100)}%`
    : '0%';

  // Information sections data
  const infoSections = [
    {
      label: 'Chance of Rain',
      content: chanceOfRain,
      icon: '🌧️'
    },
    {
      label: 'Wind Speed',
      content: `${weather.wind.speed.toFixed(1)} m/s`,
      icon: '💨'
    },
    {
      label: 'UV Index',
      content: `${(weather.main.temp / 10).toFixed(1)}`, // Placeholder calculation
      icon: '🍃'
    },
    {
      label: 'Humidity',
      content: `${weather.main.humidity}%`,
      icon: '💧'
    }
  ];
  return (
    <>
    <div className="grid lg:grid-cols-2 lg:gap-10 grid-cols-1 space-y-2 lg:space-y-8">
        <div className={`blur-card text-primary ${styles.card}`}>
          <div className="grid grid-cols-2 items-center justify-between py-3">
            <div className="flex items-center justify-start gap-2">
              <FaLocationDot size={15} />
              <span className="text-lg">{weather.name}, {weather.sys.country}</span>
            </div>
          <div className="flex flex-col items-end">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isFahrenheit}
                onChange={(e) => setIsFahrenheit(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="group peer ring-0 bg-linear-to-r from-blue-400 to-blue-500 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-linear-to-r peer-checked:from-teal-400 peer-checked:to-teal-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-hover:after:scale-95 after:z-10">
                <span className="absolute top-3 left-3 text-white font-bold text-lg z-0">°C</span>
                <span className="absolute top-3 right-3 text-white font-bold text-lg z-0">°F</span>
              </div>
            </label>
          </div> 
      </div>
          <div className={styles.container}>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <p className={styles.description}>{weather.weather[0].description}</p>
                <p className={styles.current}>{convertTemp(weather.main.temp)}&deg;{tempUnit}</p>
              <div className="flex gap-2 items-center justify-start">
                  <span className="font-bold">Min: </span><span>{convertTemp(weather.main.temp_min)}&deg;{tempUnit}</span>
                  <span className="font-bold">Max: </span><span>{convertTemp(weather.main.temp_max)}&deg;{tempUnit}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="text-[9rem]">{getWeatherIcon(weather.weather[0].description)}</div>
                  <p className="flex gap-2 justify-center">
                    <span className="font-bold text-right">Feels Like:</span> 
                    <span>{convertTemp(weather.main.feels_like)}&deg;{tempUnit}</span>
                  </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`blur-card text-primary ${styles.card}`}>
          <div className="grid gap-6 sm:grid-cols-2">
            {infoSections.map(({ label, content, icon }) => (
              <div
                key={label}
                className="max-w-3xl mx-auto rounded-2xl lg:p-8 px-4 py-4"
              >
                <div className="text-gray-800 font-bold text-xl mb-4">{icon} {label}</div>
                <div className="text-gray-700 text-md font-normal">
                  {content && <p>{content}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
          <WeatherHours 
          weather={weather} 
          hourlyWeather={hourlyWeather} 
          convertTemp={convertTemp} 
          tempUnit={tempUnit} />

          <WeatherSunTime 
          weather={weather} />
        </div>
    </>
  )
}
