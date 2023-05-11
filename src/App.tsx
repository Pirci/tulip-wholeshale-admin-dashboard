import styles from './App.module.scss'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className={styles.app_container}>
      <Header />
      <Footer />
    </div>
  );
}

export default App;

