import { useState } from 'react';
import styles from './App.module.scss';
import Content from './components/Layout/Content';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [headerTitle, setHeaderTitle] = useState('Dashboard');
  const [subtitle, setHeaderSubtitle] = useState('');

  // let headerTitle = "";
  // let subtitle= "";

  const handleClick = (val: string) => {
    setHeaderTitle(val);
    setHeaderSubtitle(`${val}_subtitle`);
    // headerTitle = val;
    // subtitle= `${val}_subtitle`;
  };
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className={styles.app_container}>
          <div className={styles.header_container}>
            <Header title={headerTitle} subtitle={subtitle} />
          </div>
          <div className={styles.content_container}>
            <Content onHandleClick={(val) => handleClick(val)} />
          </div>
          <div className={styles.footer_container}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
