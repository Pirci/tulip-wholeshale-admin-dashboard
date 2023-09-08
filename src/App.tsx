import { createContext, useEffect, useState } from 'react';
import styles from './App.module.scss';
import Content from './components/Layout/Content';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Customer } from './models/customer';

export const CustomerContext = createContext({
  customers: [] as Customer[],
  setCustomers: {} as React.Dispatch<React.SetStateAction<Customer[]>>,
});

function App() {
  const [headerTitle, setHeaderTitle] = useState('Dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/customers?`);
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomers().then((data) => {
      console.log(data);
      setCustomers(data);
    });
  }, []);

  const handleClick = (val: string) => {
    setHeaderTitle(val);
  };

  const customersContextObject = React.useMemo(
    () => ({
      customers,
      setCustomers,
    }),
    [customers, setCustomers]
  );

  return (
    <React.StrictMode>
      <CustomerContext.Provider value={customersContextObject}>
        <BrowserRouter>
          <div className={styles.app_container}>
            <div className={styles.header_container}>
              <Header title={headerTitle} subtitle={''} />
            </div>
            <div className={styles.content_container}>
              <Content onHandleClick={(val) => handleClick(val)} />
            </div>
            <div className={styles.footer_container}>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </CustomerContext.Provider>
    </React.StrictMode>
  );
}

export default App;
