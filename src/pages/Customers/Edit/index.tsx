import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styles from './index.module.scss';
import { Customer } from '../../../models/customer';
import CustomerEntryForm from '../../../components/Customers/CustomerEntryForm';

export default function CustomerEdit() {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState<Customer>({} as Customer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setCustomerData(data);
          setLoading(false);
        }, 2000);
      });
  }, [id]);

  return loading ? (
    <div className={styles.page_container}>
      <CircularProgress
        className={styles.page_container_loading}
        color="inherit"
        size={100}
      />
    </div>
  ) : (
    <CustomerEntryForm initialValues={customerData} mode="edit" />
  );
}
