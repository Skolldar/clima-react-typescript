import axios from 'axios'; //es una abstraccion sobre FETCH API, simplifica un poco los llamados cuando se consume unos dato 
//import { z } from 'zod'; //libreria de validador de datos
import {object, array, string, number, InferOutput, parse} from 'valibot'
import { SearchType } from '../types/types-index';
import { countries } from '../data/countries'
import { useMemo, useState } from 'react';


//Type Guard o assertion

//VALIBOT LIBRERIA
const WeatherSchema = object({
  name: string(),
  main: object({
    feels_like : number(),
    humidity : number(),
    temp: number(),
    temp_max: number(),
    temp_min: number(),
  }),
  wind: object({
    speed: number(),
    deg: number()
  }),
  sys: object({
    sunrise: number(),
    sunset: number(),
    country: string()
  }),
  weather: array(
    object({
      description: string()
    })
  )
  ,
  visibility: number()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HourlyWeatherSchema = object({
  time: string(),
  temperature_2m: number(),
  weathercode: number(),
  windspeed_10m: number(),
  precipitation_probability: number()
})

export type HourlyWeather = InferOutput<typeof HourlyWeatherSchema>


//exportamos el type para usarlo en el WeatherDetail
export type Weather = InferOutput<typeof WeatherSchema> //InferOutput to define a type for the output of the schema validatio


const initialState = {
  name: '',
  visibility: 0,
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    humidity: 0,
  },
  weather: [ 
    {
      description: '',
    }
  ],
  wind: {
    speed: 0,
    deg: 0
  },
  sys:{
    sunrise: 0,
    sunset: 0
    ,
    country: ''
  },
 }

const initialHourlyState: HourlyWeather[] = []

export default function useWeather() {

  //Loading:
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [weather, setWeather] = useState<Weather>(initialState)
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>(initialHourlyState)
  const [uvIndex, setUvIndex] = useState<number | null>(null)

    //Asincrona para hacer el llamado de la API (bloquea el codigo hasta que tengamos una respuesta)
    const fetchWeather = async (search: SearchType) => {
        
        const appId = import.meta.env.VITE_API_KEY

        setLoading(true);
        
        setWeather(initialState);
        setHourlyWeather(initialHourlyState);
        setNotFound(false);

        //try catch permite que al tener un error puedas debuguear
        try {
            const countryCode = countries.find(c => c.name.toLowerCase() === (search.country || '').toLowerCase())?.code ?? search.country
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${countryCode}&appid=${appId}`
          console.log(geoUrl)

            const {data} = await axios(geoUrl)
            console.log(data)

            if(!data[0]) {
              setNotFound(true);
              setTimeout(() => {
                setNotFound(false);
              }, 2000);
            return;
            }
            //Latitud y longitud:
            const lat = data[0].lat
            const lon = data[0].lon
            const geoCountryCode = data[0].country
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`
            const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,windspeed_10m,precipitation_probability,uv_index&timezone=auto&forecast_days=2`

            const [weatherResponse, openMeteoResponse] = await Promise.all([
              axios(weatherUrl),
              axios(openMeteoUrl),
            ])
            const weatherResult = parse(WeatherSchema, weatherResponse.data)
            console.log(weatherResult)

            // Parse hourly forecast data from Open-Meteo (next 24 hours)
            const hourlyData: HourlyWeather[] = []
            try {
              const omHourly = openMeteoResponse?.data?.hourly
              if (omHourly) {
                const times: string[] = omHourly.time || []
                const temps: number[] = omHourly.temperature_2m || []
                const codes: number[] = omHourly.weathercode || []
                const winds: number[] = omHourly.windspeed_10m || []
                const precips: number[] = omHourly.precipitation_probability || []
                
                const now = new Date()
                const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)
                
                for (let i = 0; i < times.length && hourlyData.length < 24; i++) {
                  const time = new Date(times[i])
                  if (time >= now && time <= next24Hours) {
                    hourlyData.push({
                      time: times[i],
                      temperature_2m: temps[i] ?? 0,
                      weathercode: codes[i] ?? 0,
                      windspeed_10m: winds[i] ?? 0,
                      precipitation_probability: precips[i] ?? 0
                    })
                  }
                }
              }
            } catch (error) {
              console.log('Error parsing hourly data:', error)
            }
            console.log('hourly forecast:', hourlyData)

            // Parse UV index from Open-Meteo (hourly). Pick nearest hour to now.
            try {
              const omHourly = openMeteoResponse?.data?.hourly
              const times: string[] = omHourly?.time || []
              const uvs: number[] = omHourly?.uv_index || []
              if (times.length && uvs.length) {
                let minDiff = Infinity
                let idx = 0
                const now = Date.now()
                for (let i = 0; i < times.length; i++) {
                  const t = Date.parse(times[i])
                  const diff = Math.abs(t - now)
                  if (diff < minDiff) {
                    minDiff = diff
                    idx = i
                  }
                }
                const currentUv = typeof uvs[idx] === 'number' ? uvs[idx] : null
                setUvIndex(currentUv)
              } else {
                setUvIndex(null)
              }
            } catch (error) {
              console.log(error)
              setUvIndex(null)
            }


            if(weatherResult){
              const countryName = countries.find(c => c.code === geoCountryCode)?.name ?? weatherResult.sys.country
              setWeather({
                ...weatherResult,
                sys: {
                  ...weatherResult.sys,
                  country: countryName
                }
              })
              setHourlyWeather(hourlyData)
              console.log(weatherResult)
            }

        } catch (error) {
            console.log(error)
        } finally {
          setLoading(false)
        }
    }

    const fetchWeatherByLocation = async () => {
        const appId = import.meta.env.VITE_API_KEY

        setLoading(true);
        setWeather(initialState);
        setHourlyWeather(initialHourlyState);
        setNotFound(false);

        if (!navigator.geolocation) {
            setNotFound(true);
            setTimeout(() => setNotFound(false), 2000);
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
                    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,windspeed_10m,precipitation_probability,uv_index&timezone=auto&forecast_days=2`
                    const [weatherResponse, openMeteoResponse] = await Promise.all([
                      axios(weatherUrl),
                      axios(openMeteoUrl),
                    ]);

                    const weatherResult = parse(WeatherSchema, weatherResponse.data);

                    // Parse hourly forecast data from Open-Meteo (next 24 hours)
                    const hourlyData: HourlyWeather[] = []
                    try {
                      const omHourly = openMeteoResponse?.data?.hourly
                      if (omHourly) {
                        const times: string[] = omHourly.time || []
                        const temps: number[] = omHourly.temperature_2m || []
                        const codes: number[] = omHourly.weathercode || []
                        const winds: number[] = omHourly.windspeed_10m || []
                        const precips: number[] = omHourly.precipitation_probability || []
                        
                        const now = new Date()
                        const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)
                        
                        for (let i = 0; i < times.length && hourlyData.length < 24; i++) {
                          const time = new Date(times[i])
                          if (time >= now && time <= next24Hours) {
                            hourlyData.push({
                              time: times[i],
                              temperature_2m: temps[i] ?? 0,
                              weathercode: codes[i] ?? 0,
                              windspeed_10m: winds[i] ?? 0,
                              precipitation_probability: precips[i] ?? 0
                            })
                          }
                        }
                      }
                    } catch (error) {
                      console.log('Error parsing hourly data:', error)
                    }
                    console.log('hourly forecast:', hourlyData)
                    try {
                      const omHourly = openMeteoResponse?.data?.hourly
                      const times: string[] = omHourly?.time || []
                      const uvs: number[] = omHourly?.uv_index || []
                      if (times.length && uvs.length) {
                        let minDiff = Infinity
                        let idx = 0
                        const now = Date.now()
                        for (let i = 0; i < times.length; i++) {
                          const t = Date.parse(times[i])
                          const diff = Math.abs(t - now)
                          if (diff < minDiff) {
                            minDiff = diff
                            idx = i
                          }
                        }
                        const currentUv = typeof uvs[idx] === 'number' ? uvs[idx] : null
                        setUvIndex(currentUv)
                        console.log(currentUv)
                      } else {
                        setUvIndex(null)
                      }
                    } catch (error) {
                      console.log(error)
                      setUvIndex(null)
                    }

                    const countryName = countries.find(c => c.code === weatherResult.sys.country)?.name ?? weatherResult.sys.country;

                    setWeather({
                        ...weatherResult,
                        sys: {
                            ...weatherResult.sys,
                            country: countryName
                        }
                    });
                    setHourlyWeather(hourlyData);
                } catch (error) {
                    console.log(error);
                    setNotFound(true);
                    setTimeout(() => setNotFound(false), 2000);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.log('Geolocation error:', error);
                setNotFound(true);
                setTimeout(() => setNotFound(false), 2000);
                setLoading(false);
            }
        );
    };

    //Verificar si el weather tiene algo mostrara el titulo de WeatherDetail
    const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    weather,
    hourlyWeather,
    loading,
    notFound,
      fetchWeather,
    fetchWeatherByLocation,
      hasWeatherData,
      uvIndex,
  }
}