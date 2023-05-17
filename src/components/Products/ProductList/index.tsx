import styles from './index.module.scss';

export const ProductList = () => (
  <div className={styles.content_container}>
    <div className={styles.page_header}>List of Products</div>
    <ul className={styles.product_list}>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  </div>
);
