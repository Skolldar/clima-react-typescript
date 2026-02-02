import { Weather, HourlyWeather } from "../../hooks/useWeather"
import { format } from 'date-fns'

type WeatherHoursProps = {
  weather: Weather
  hourlyWeather: HourlyWeather[]
  tempUnit: string
}

const WeatherHours = ({ hourlyWeather, tempUnit }: WeatherHoursProps) => {

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️'
    if (code <= 3) return '🌤️'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️' 
    if (code <= 77) return '❄️' 
    if (code <= 82) return '🌧️' 
    if (code <= 86) return '❄️' 
    if (code <= 99) return '⛈️' 
    return '☁️'
  }

  return (
    <>
        <div className="blur-card">
          <h2 className="font-semibold text-primary text-left pb-5">48-Hourly Forecast</h2>
            <div className=" bg-white/50 shadow-md py-4 rounded-xl">
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 px-2 py-2 items-center">
                    {hourlyWeather.length > 0 ? (
                      hourlyWeather.map((hour, index) => {
                        const hourDate = new Date(hour.time)
                        const timeLabel = format(hourDate, 'ha').toLowerCase()
                        const icon = getWeatherIcon(hour.weathercode)
                        const tempCelsius = hour.temperature_2m
                        const displayTemp = tempUnit === 'F' 
                          ? Math.round((tempCelsius * 9/5) + 32)
                          : Math.round(tempCelsius)

                        return (
                          <div key={index} className="flex flex-col p-6 items-center justify-center space-y-10 rounded-lg">
                            <div className="text-2xl text-primary">{timeLabel}</div>
                            <div className="text-5xl">{icon}</div>
                            <div className="font-semibold text-primary text-2xl">{displayTemp}&deg;{tempUnit}</div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="col-span-full text-center text-primary py-10">
                        No hourly forecast available
                      </div>
                    )}
                  </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default WeatherHours