import { format } from 'date-fns'
import styles from "./WeatherDetail.module.css"
import { Weather } from '../../hooks/useWeather'

type WeatherSunTimeProps = {
  weather: Weather
}

const WeatherSunTime = ({weather}: WeatherSunTimeProps) => {
  return (
    <>
    <div className={`blur-card ${styles.card}`}>
          <h2 className="font-bold text-primary text-4xl">Sunset and Sunrise</h2>
          <div className="grid gap-6 text-primary sm:grid-cols-2">
            <div className="">
              <div className="mb-4 flex justify-center">
                <img src="../sunrise.png" alt="Sunrise" className='w-30 h-30' />
              </div>
              <div className="text-primary text-md font-normal">
                <p className="text-2xl font-semibold">{format(new Date(weather.sys.sunrise * 1000), 'h:mm a')}</p>
              </div>
            </div>
            <div className=" ">
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