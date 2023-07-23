import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styles from './index.module.scss';
import { Vendor } from '../../../models/vendor';
import VendorEntryForm from '../../../components/Vendors/VendorEntryForm';
import { Product } from '../../../models/product';

export default function VendorEdit() {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState<Vendor>({} as Vendor);
  const [productData, setProductData] = useState<Product[]>([] as Product[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/vendors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setVendorData(data);
          setLoading(false);
        }, 2000);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  return loading ? (
    <div className={styles.page_container}>
      <CircularProgress
        className={styles.page_container_loading}
        color="inherit"
        size={100}
      />
    </div>
  ) : (
    <VendorEntryForm
      mode="edit"
      initialValues={vendorData}
      products={productData}
    />
  );
}
