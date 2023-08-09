import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../../src/models/product';
import CustomTable from '../../shared/CustomTable';

export const ProductList = () => {
  //We shall not do this
  // console.log(document.getElementById('#outlined-basic-2').classList.add('my-awasome-class'));
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsLength, setProductsLength] = useState(0);

  // use memo can be used in here to avoid re-rendering
  const displayedProducts = [
    { label: 'Product Name', value: 'productName' },
    { label: 'Date', value: 'date' },
    { label: 'Color', value: 'color' },
    { label: 'Price', value: 'price' },
    { label: 'Amount', value: 'amount' },
    { label: 'Stock availability', value: 'isStockAvailable' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products?_page=${
            page + 1
          }&_limit=${rowsPerPage}`
        );
        const contentType = response.headers.get('content-type');
        let total = response.headers.get('X-Total-Count');
        setProductsLength(Number(total));
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.log('No JSON data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  const tableUpdateAfterRecordDelete = (recordId: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== recordId
    );
    setProducts(updatedProducts);
    setProductsLength(prev => prev-1);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>List of Products</div>
      <CustomTable
        records={products}
        tableURLExtension={'products'}
        recordsLength={productsLength}
        onPageChange={(page) => setPage(page)}
        onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
        onRecordsDelete={(recordId) => {
          tableUpdateAfterRecordDelete(recordId);
        }}
        displayedItems={displayedProducts}
      ></CustomTable>
    </div>
  );
};
