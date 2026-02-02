import { Weather, HourlyWeather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import { format } from 'date-fns'
import styles from "./WeatherDetail.module.css"

type WeatherHoursProps = {
  weather: Weather
  hourlyWeather: HourlyWeather[]
  convertTemp: (celsius: number) => number
  tempUnit: string
}

const WeatherHours = ({ weather, hourlyWeather, convertTemp, tempUnit }: WeatherHoursProps) => {
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

  return (
    <div>
      <div className={`blur-card text-primary ${styles.card}`}>
        <h2 className="font-bold text-4xl mb-8">Today</h2>
        <div className={styles.container}>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-10 py-4 text-center items-center">
              {hourlyWeather.length > 0 ? (
                hourlyWeather.map((hour) => {
                  const hourDate = new Date(hour.dt * 1000)
                  const timeLabel = format(hourDate, 'ha').toLowerCase()
                  const desc = hour.weather[0]?.description || ''
                  const icon = getWeatherIcon(desc)

                  return (
                    <div key={hour.dt} className="flex flex-col items-center justify-center text-sm space-y-6 rounded-lg">
                      <div className="text-2xl text-gray-500">{timeLabel}</div>
                      <div className="text-5xl">{icon}</div>
                      <div className="font-semibold text-2xl">{convertTemp(hour.main.temp)}&deg;{tempUnit}</div>
                    </div>
                  )
                })
              ) : (
                Array.from({ length: 7 }).map((_, i) => {
                  const hourDate = new Date(Date.now() + i * 60 * 60 * 1000)
                  const timeLabel = format(hourDate, 'ha').toLowerCase()
                  const baseTemp = formatTemperature(weather.main.temp)
                  const temp = baseTemp + (i - 3)

                  const desc = weather.weather[0].description.toLowerCase()
                  const icon = desc.includes('cloud')
                    ? '☁️'
                    : desc.includes('rain') || desc.includes('drizzle')
                    ? '🌧️'
                    : desc.includes('snow')
                    ? '❄️'
                    : desc.includes('storm') || desc.includes('thunder')
                    ? '⛈️'
                    : '☀️'

                  return (
                    <div key={i} className="flex flex-col items-center justify-center text-sm space-y-6 rounded-lg">
                      <div className="text-2xl text-gray-500">{timeLabel}</div>
                      <div className="text-5xl">{icon}</div>
                      <div className="font-semibold text-2xl">{temp}&deg;{tempUnit}</div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherHours