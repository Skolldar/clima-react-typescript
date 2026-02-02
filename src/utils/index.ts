import { format } from 'date-fns';

//cambiar el formato a celsius
export const formatTemperature = (temperature: number ) : number => {
  // The API is requested with `units=metric`, so temperatures are already in Celsius.
  // Return a rounded integer Celsius value.
  return Math.round(temperature);
}


export function formatTime(timestamp: number): string {
  // Convert timestamp to Date object (assuming it's in seconds)
  const date = new Date(timestamp * 1000);

  // Format the time using date-fns (e.g., 12:34 PM)
  return format(date, 'h:mm a');
}