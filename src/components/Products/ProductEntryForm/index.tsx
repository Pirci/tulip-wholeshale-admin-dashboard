import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@mui/material';
import styles from './index.module.scss';
import { useState } from 'react';
import { colors } from '../../../constants/colors';

interface Props {}

export const ProductEntryForm = (props: Props) => {
  const [formValues, setFormValues] = useState({
    productName: '',
    productCategory: '',
    color: '',
    price: '',
    amount: '',
    vendor: '',
    isStockAvailable: false,
    demandRating: '',
  });
  const [toastState, setToastState] = useState('success');
  const [open, setOpen] = useState(false);

  const handleClick = (event: any) => {
    // console.log(event);
    event.preventDefault();
    try {
      console.log(formValues);
      setToastState('success');
    } catch (error) {
      console.log(error);
      setToastState('error');
    }
    setOpen(true);
  };

  const handleRadioChange = (event: any) => {
    console.log(event.target.value);
    setFormValues((prev) => {
      return {
        ...prev,
        color: event.target.value,
      };
    });
  };

  const handleChange = (field: any, value: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Product Entry Form</div>
      <form className={styles.form_container}>
        <TextField
          id="outlined-basic-1"
          label="Product Name"
          variant="outlined"
          value={formValues.productName}
          onChange={(event) => handleChange('productName', event.target.value)}
        />
        <br></br>
        <TextField
          id="outlined-basic-2"
          label="Category"
          variant="outlined"
          value={formValues.productCategory}
          onChange={(event) =>
            handleChange('productCategory', event.target.value)
          }
        />
        <br></br>
        <TextField
          id="outlined-basic-4"
          label="Price"
          variant="outlined"
          value={formValues.price}
          onChange={(event) => handleChange('price', event.target.value)}
        />
        <br></br>

        <TextField
          id="outlined-basic-5"
          label="Amount"
          variant="outlined"
          value={formValues.amount}
          onChange={(event) => handleChange('amount', event.target.value)}
        />
        <br></br>
        <TextField
          id="outlined-basic-6"
          label="Vendor"
          variant="outlined"
          value={formValues.vendor}
          onChange={(event) => handleChange('vendor', event.target.value)}
        />
        <br></br>
        <TextField
          id="outlined-basic-7"
          label="Availablity"
          variant="outlined"
          value={formValues.isStockAvailable}
          onChange={(event) =>
            handleChange('isStockAvailable', event.target.value)
          }
        />
        <br></br>
        <TextField
          id="outlined-basic-8"
          label="Demand Rating"
          variant="outlined"
          value={formValues.demandRating}
          onChange={(event) => handleChange('demandRating', event.target.value)}
        />
        <br></br>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Colors</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="blue"
            name="radio-buttons-group"
            onChange={handleRadioChange}
          >
            {colors.map((color) => {
              return (
                <FormControlLabel
                  key={color.value}
                  value={color.value}
                  control={<Radio />}
                  label={color.name}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {toastState === 'success' ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            This is a success message!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This is a error message!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
