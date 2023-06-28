import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../models/product';
import { CircularProgress } from '@mui/material';
import ProductEntryForm from '../../components/Products/ProductEntryForm';
import styles from './index.module.scss';

export default function ProductEdit() {
  const { id } = useParams();
  const [productData, setProductData] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(true);
  const productDataWithConverted = {
    ...productData,
    price: productData.price ? productData.price.toString() : '',
    amount: productData.amount ? productData.amount.toString() : '',
    demandRating: productData.demandRating
      ? productData.demandRating.toString()
      : '',
    isStockAvailable: productData.isStockAvailable,
  };

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProductData(data);
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
    <ProductEntryForm initialValues={productDataWithConverted} />
  );
}
