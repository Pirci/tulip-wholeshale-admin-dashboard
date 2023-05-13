import Sidebar from '../Sidebar';
import styles from './index.module.scss';
export default function Content() {
  return (
    <div className={styles.main_container}>
      <Sidebar/>
      {/* put your page component here */}
    </div>
  );
}
