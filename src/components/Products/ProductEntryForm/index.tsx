import styles from './index.module.scss'


export const ProductEntryForm = () => (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Product Entry Form</div>
      <form className={styles.form_container}>
        <label>
          Product Name:
          <input type="text" name="productName" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );