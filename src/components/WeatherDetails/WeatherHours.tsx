import { Weather, HourlyWeather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import { format } from 'date-fns'

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
    <>
        <div className="blur-card">
          <h2 className="font-semibold text-primary text-left pb-5">24-Hours Forecast</h2>
            <div className=" bg-white/50 shadow-md py-4 rounded-xl">
                <div className="grid grid-cols-7 gap-2 text-center items-center">
                    {hourlyWeather.length > 0 ? (
                      hourlyWeather.map((hour) => {
                        const hourDate = new Date(hour.dt * 1000)
                        const timeLabel = format(hourDate, 'ha').toLowerCase()
                        const desc = hour.weather[0]?.description || ''
                        const icon = getWeatherIcon(desc)

                        return (
                          <div key={hour.dt} className="flex flex-col items-center justify-center space-y-10 rounded-lg">
                            <div className="text-2xl text-primary">{timeLabel}</div>
                            <div className="text-5xl">{icon}</div>
                            <div className="font-semibold text-primary text-2xl">{convertTemp(hour.main.temp)}&deg;{tempUnit}</div>
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
                          <div key={i} className="flex flex-col items-center justify-center space-y-10 rounded-lg">
                            <div className="text-2xl text-primary">{timeLabel}</div>
                            <div className="text-5xl">{icon}</div>
                            <div className="font-semibold text-primary text-2xl">{temp}&deg;{tempUnit}</div>
                          </div>
                        )
                      })
                    )}
                </div>
            </div>
        </div>
      </>
  )
}

export default WeatherHours