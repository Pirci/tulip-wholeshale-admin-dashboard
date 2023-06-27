import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../models/product';
import { CircularProgress } from '@mui/material';

export default function ProductEdit() {
  const { id } = useParams();
  const [productData, setProductData] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`).then((res) => {
      res.json().then((data) => {
        setProductData(data);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading)
    return (
      <div>
        <CircularProgress style={{ color: 'white' }} />
      </div>
    );

  return <div>This is edit page product: {productData.productName}</div>;
}
