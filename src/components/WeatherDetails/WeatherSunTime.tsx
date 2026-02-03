import { format } from 'date-fns'
import { Weather } from '../../hooks/useWeather'

type WeatherSunTimeProps = {
  weather: Weather
}

const WeatherSunTime = ({weather}: WeatherSunTimeProps) => {
  return (
    <>
    <div className="blur-card">
          <h2 className="font-semibold text-primary text-left lg:pb-8 pb-2">Sunset and Sunrise</h2>
          <div className="mt-2 grid items-center gap-6 text-primary sm:grid-cols-2">
          <div className="bg-white/50 shadow-md lg:p-8 py-4 rounded-xl flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <img src="../sunrise.png" alt="Sunrise" className='lg:w-40 lg:h-40 w-20 h-20' />
              </div>
              <div className="text-primary py-5 text-md font-normal">
                <p className="lg:text-2xl text-xl font-semibold">{format(new Date(weather.sys.sunrise * 1000), 'h:mm a')}</p>
              </div>
            </div>
          <div className="bg-white/50 shadow-md lg:p-8 py-4 rounded-xl flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <img src="../sunset.png" alt="Sunset" className='lg:w-40 lg:h-40 w-20 h-20' />
              </div>
              <div className="text-primary py-5 text-md font-normal">
                <p className="lg:text-2xl text-xl font-semibold">{format(new Date(weather.sys.sunset * 1000), 'h:mm a')}</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default WeatherSunTime