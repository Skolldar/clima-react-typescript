import { format } from 'date-fns'
import { Weather } from '../../hooks/useWeather'

type WeatherSunTimeProps = {
  weather: Weather
}

const WeatherSunTime = ({weather}: WeatherSunTimeProps) => {
  return (
    <>
    <div className="blur-card">
          <h2 className="font-semibold text-primary text-left pb-4">Sunset and Sunrise</h2>
          <div className="mt-2 grid items-center gap-6 text-primary sm:grid-cols-2">
          <div className="bg-white/50 shadow-md p-4 rounded-xl flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <img src="../sunrise.png" alt="Sunrise" className='w-30 h-30' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl font-semibold">{format(new Date(weather.sys.sunrise * 1000), 'h:mm a')}</p>
              </div>
            </div>
          <div className="bg-white/50 shadow-md p-4 rounded-xl flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <img src="../sunset.png" alt="Sunset" className='w-30 h-30' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl font-semibold">{format(new Date(weather.sys.sunset * 1000), 'h:mm a')}</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default WeatherSunTime