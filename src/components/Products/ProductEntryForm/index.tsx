import { TextField } from '@mui/material';
import styles from './index.module.scss';
import { useState } from 'react';

export const ProductEntryForm = () => {
  const [formValues, setFormValues] = useState({ productName: '', price: '' });

  const handleClick = (event: any) => {
    console.log(event);
    event.preventDefault();
    console.log(formValues);
  };

  const handleChange = (field: any, event: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [field]: event.target.value,
      };
    });
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Product Entry Form</div>
      <form className={styles.form_container}>
        <TextField
          id="outlined-basic"
          label="Product Name"
          variant="outlined"
          value={formValues.productName}
          onChange={(event) => handleChange('productName', event as any)}
        />
        <br></br>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={formValues.price}
          onChange={(event) => handleChange('price', event as any)}
        />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};
