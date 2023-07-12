import { useState } from 'react';

import styles from './index.module.scss';
import { CustomerList } from '../../components/Customers/CustomerList';
import CustomerEntryForm from '../../components/Customers/CustomerEntryForm';

export default function Customers() {
  const [activeView, setActiveView] = useState('list');

  const handleClick = (val: string) => {
    // console.log(val);
    //extra operations
    setActiveView(val);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.button_container}>
        <button
          className={activeView === 'list' ? styles.active_button : ''}
          onClick={() => handleClick('list')}
        >
          List of Customers
        </button>
        <button
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Customer Entry Form
        </button>
      </div>
      <div>
        {activeView === 'list' ? <CustomerList /> : <CustomerEntryForm />}
      </div>
    </div>
  );
}
