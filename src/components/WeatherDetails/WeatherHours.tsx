import { Weather, HourlyWeather } from "../../hooks/useWeather"
import { format } from 'date-fns'

type WeatherHoursProps = {
  weather: Weather
  hourlyWeather: HourlyWeather[]
  tempUnit: string
}

const WeatherHours = ({ hourlyWeather, tempUnit }: WeatherHoursProps) => {
  const cloudNight = 'https://i.postimg.cc/D0Fhcvrs/night-cloud.png'
  const getWeatherIcon = (code: number, isNight = false) => {
    if (code === 0) return isNight ? '🌙' : '☀️'
    if (code <= 3) {
      return isNight ? (
        <img src={cloudNight} alt="Night clouds" className="w-12 h-12" />
      ) : (
        '🌤️'
      )
    }
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
          <h2 className="font-semibold text-primary text-left lg:pb-8 pb-2">48-Hourly Forecast</h2>
            <div className=" bg-white/50 shadow-md py-4 rounded-xl">
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 lg:p-8 items-center">
                    {hourlyWeather.length > 0 ? (
                      hourlyWeather.map((hour, index) => {
                        const hourDate = new Date(hour.time)
                        const timeLabel = format(hourDate, 'ha').toLowerCase()
                        const isNight = (() => {
                          const h = hourDate.getHours()
                          return h < 6 || h >= 18
                        })()
                        const icon = getWeatherIcon(hour.weathercode, isNight)
                        const tempCelsius = hour.temperature_2m
                        const displayTemp = tempUnit === 'F' 
                          ? Math.round((tempCelsius * 9/5) + 32)
                          : Math.round(tempCelsius)

                        return (
                          <div key={index} className="flex flex-col p-6 items-center justify-center space-y-10 rounded-lg">
                            <div className="lg:text-2xl text-xl text-primary">{timeLabel}</div>
                            <div className="lg:text-5xl text-3xl">{icon}</div>
                            <div className="font-semibold text-primary lg:text-2xl text-xl">{displayTemp}&deg;{tempUnit}</div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="col-span-full text-center text-primary py-10 lg:text-2xl text-xl">
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