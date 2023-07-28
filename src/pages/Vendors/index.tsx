import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { VendorList } from '../../components/Vendors/VendorList';
import { VendorEntryForm } from '../../components/Vendors/VendorEntryForm';
import { Product } from '../../models/product';
import { Button } from '@mui/material';

export default function Vendors() {
  const [productData, setProductData] = useState<Product[]>([] as Product[]);
  const [activeView, setActiveView] = useState('list');

  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  const handleClick = (val: string) => {
    // console.log(val);
    //extra operations
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
          List of Vendors
        </Button>
        <Button
          variant="contained"
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Enter Vendor
        </Button>
      </div>
      <div></div>
      {activeView === 'list' ? (
        <VendorList />
      ) : (
        <VendorEntryForm mode="new" products={productData} />
      )}
    </div>
  );
}
