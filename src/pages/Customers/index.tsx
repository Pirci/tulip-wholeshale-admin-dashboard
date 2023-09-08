import { useState } from 'react';
import styles from './index.module.scss';
import { CustomerList } from '../../components/Customers/CustomerList';
import CustomerEntryForm from '../../components/Customers/CustomerEntryForm';
import { Button } from '@mui/material';

export default function Customers() {
  const [activeView, setActiveView] = useState('list');

  const handleClick = (val: string) => {
    setActiveView(val);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.button_container}>
        <Button
          variant="contained"
          className={activeView === 'list' ? styles.active_button : ''}
          onClick={() => handleClick('list')}
        >
          List of Customers
        </Button>
        <Button
          variant="contained"
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Enter Customer
        </Button>
      </div>
      <div>
        {activeView === 'list' ? (
          <CustomerList />
        ) : (
          <CustomerEntryForm mode="new" />
        )}
      </div>
    </div>
  );
}
