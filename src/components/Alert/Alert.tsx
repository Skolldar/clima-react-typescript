import { ReactNode } from "react";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Alert.module.css"

export default function Alert({children} : {children : ReactNode}) {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
