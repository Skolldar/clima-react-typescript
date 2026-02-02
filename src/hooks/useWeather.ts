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
})

const HourlyWeatherSchema = object({
  dt: number(),
  main: object({
    temp: number(),
  }),
  weather: array(
    object({
      description: string()
    })
  ),
  wind: object({
    speed: number()
  }),
  pop: number()
})

export type HourlyWeather = InferOutput<typeof HourlyWeatherSchema>


//exportamos el type para usarlo en el WeatherDetail
export type Weather = InferOutput<typeof WeatherSchema> //InferOutput to define a type for the output of the schema validatio


const initialState = {
  name: '',
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

    //Asincrona para hacer el llamado de la API (bloquea el codigo hasta que tengamos una respuesta)
    const fetchWeather = async (search: SearchType) => {
        
        const appId = import.meta.env.VITE_API_KEY

        setLoading(true);
        
        setWeather(initialState);
        setHourlyWeather(initialHourlyState);
        setNotFound(false);

        //try catch permite que al tener un error puedas debuguear
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
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
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`

            const [weatherResponse, forecastResponse] = await Promise.all([
              axios(weatherUrl),
              axios(forecastUrl)
            ])

            const weatherResult = parse(WeatherSchema, weatherResponse.data)
            console.log(weatherResult)

            // Parse hourly forecast data - get next 7 readings (roughly 24 hours)
            const forecastData = forecastResponse.data.list || []
            const hourlyData = forecastData.slice(0, 7).map((item: void) => 
              parse(HourlyWeatherSchema, item)
            )
            console.log(hourlyData)

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
                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
                    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`;

                    const [weatherResponse, forecastResponse] = await Promise.all([
                        axios(weatherUrl),
                        axios(forecastUrl)
                    ]);

                    const weatherResult = parse(WeatherSchema, weatherResponse.data);

                    const forecastData = forecastResponse.data.list || [];
                    const hourlyData = forecastData.slice(0, 7).map((item: void) => parse(HourlyWeatherSchema, item));

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
    hasWeatherData
  }
}