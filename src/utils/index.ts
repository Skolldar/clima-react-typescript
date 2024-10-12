import { format } from 'date-fns'; // Import date-fns for time formatting

//cambiar el formato a celsius
export const formatTemperature = (temperature: number ) : number => {
    const kelvin = 273.15
    return parseInt((temperature - kelvin).toString())
    //parseInt(()) redondea el resultado... y le ponemos toString() para evitar el error que teniamos... 
}


export function formatTime(timestamp: number): string {
  // Convert timestamp to Date object (assuming it's in seconds)
  const date = new Date(timestamp * 1000);

  // Format the time using date-fns (e.g., 12:34 PM)
  return format(date, 'h:mm a');
}