import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styles from './index.module.scss';
import { Vendor } from '../../../models/vendor';
import VendorEntryForm from '../../../components/Vendors/VendorEntryForm';

export default function VendorEdit() {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState<Vendor>({} as Vendor);
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

  return loading ? (
    <div className={styles.page_container}>
      <CircularProgress
        className={styles.page_container_loading}
        color="inherit"
        size={100}
      />
    </div>
  ) : (
    <VendorEntryForm initialValues={vendorData} />
  );
}