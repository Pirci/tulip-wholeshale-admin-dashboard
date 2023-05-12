import styles from './App.module.scss';
import Content from './components/Layout/Content';
import Footer from './components/Layout/Footer';
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
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
}

export default App;

