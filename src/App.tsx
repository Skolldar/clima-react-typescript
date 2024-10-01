import styles from "./App.module.css"
import Form from "./components/Form/Form"
const App = () => {
  return (
    <>
    <h1 className={styles.tittle}>Weather Search</h1>

    <div className={styles.container}>
      <Form/>
      <p>2</p>
    </div>
    </>

  )
}

export default App