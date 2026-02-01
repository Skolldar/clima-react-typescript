import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import type { SearchType } from "../../types/types-index"
import Alert from "../Alert/Alert"

type FromProps = {
    fetchWeather: (search: SearchType) => Promise<void>
  }

export default function Form({fetchWeather}: FromProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            setAlert('All fields are required')
            setTimeout(() => {
                setAlert("");
              }, 2000);
            return;
        }
        fetchWeather(search)
        
    }

  return (
    <>
    <form className={styles.form} 
        onSubmit={handleSubmit}    
    >

    {alert && <Alert>
        {alert}
        </Alert>}

        {/** CITY */}
        <div className={styles.field}>
            <label
            htmlFor="city"
            >
                City:
            </label>
            <input
            id="city"
            type="text"
            name="city"
            placeholder="City"
            value={search.city}
            onChange={handleChange}
            />
        </div>

{/** COUNTRY */}
        <div className={styles.field}>
            <label htmlFor="country">
                Country
            </label>
        <select 
        id="country"
        value={search.country}
        name="country"
        onChange={handleChange}
        >
            <option value="">
                Select a Country
            </option>
            
            {countries.map(country => (
                <option
                key={country.code}
                value={country.code}
                >
                    {country.name}
                </option>
            ))}
            </select>
        </div>


{/** BUTTON */}

        <input type="submit" className={styles.submit} value="Check Weather"/>
        
        </form>
    </>
  )
}
