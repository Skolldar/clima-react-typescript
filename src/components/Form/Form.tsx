import { countries } from "../../data/countries"
import styles from "./Form.module.css"
export default function Form() {
  return (
    <>
    <form className={styles.form}>
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
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">
                Country
            </label>
        <select>
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

        <input type="submit" className={styles.submit} value="Check Weather"/>
        
        </form>
    </>
  )
}
