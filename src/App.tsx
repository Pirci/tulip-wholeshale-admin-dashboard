import styles from './App.module.scss';
import Content from './components/Layout/Content';
import Header from './components/Layout/Header';

function App() {
  return (
    <div className={styles.app_container}>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.content_container}>
        <Content />
      </div>
    </div>
  );
}

export default App;

