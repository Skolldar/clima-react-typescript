import axios from 'axios'; //es una abstraccion sobre FETCH API, simplifica un poco los llamados cuando se consume unos dato 
//import { z } from 'zod'; //libreria de validador de datos
import {object, array, string, number, InferOutput, parse} from 'valibot'
import { SearchType } from '../types/types-index';
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
    speed: number()
  }),
  sys: object({
    sunrise: number(),
    sunset: number()
  }),
  weather: array(
    object({
      description: string()
    })
  )
})


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
    speed: 0
  },
  sys:{
    sunrise: 0,
    sunset: 0
  },
 }


export default function useWeather() {

  //Loading:
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [weather, setWeather] = useState<Weather>(initialState)

    //Asincrona para hacer el llamado de la API (bloquea el codigo hasta que tengamos una respuesta)
    const fetchWeather = async (search: SearchType) => {
        
        const appId = import.meta.env.VITE_API_KEY

        //spining loading activado no mostrara el resultaado ni la alerta de la ciudad no encontrada
        setLoading(true);
        setWeather(initialState);
        setNotFound(false);

        //try catch permite que al tener un error puedas debuguear
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            //consultar datos:
            //el default es method: get
            //{data} en destructuring para ingresar directamente a data.
            const {data} = await axios(geoUrl)
            // console.log(data)

            //Comprobar si el clima existe:
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
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            //Hacer el llamado de la url de lat y lon... hay que renombrar el data con ":"!!  
            //Castear el type:
            //Type Guards:
            //VALIBOT
            const  {data: weatherResult} = await axios(weatherUrl)

            const result =  parse(WeatherSchema, weatherResult)

            if(result){
              setWeather(result)
              console.log(result)
            }

        } catch (error) {
            console.log(error)
        } finally {
          setLoading(false)
        }
    }

    //Verificar si el weather tiene algo mostrara el titulo de WeatherDetail
    const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
  }
}