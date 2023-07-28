import ColorObserver from "../../components/Utilities/ColorObserver";
import styles from './index.module.scss';

export default function Utilities() {
  return (
    <div className={styles.main_container}>
        <ColorObserver/>
    </div>
  )
}
