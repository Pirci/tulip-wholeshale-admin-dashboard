import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import styles from './index.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../../models/product';
import { vendorAvailablity } from '../../../constants/levels';

interface Props {
  mode: 'edit' | 'new';
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    product_availablity: string;
    products_sold: Partial<Product[]>;
  };
  products: Product[];
  vendorId?: string;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const VendorEntryForm = (props: Props) => {
  const { initialValues, mode } = props;

  const [formValues, setFormValues] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
    product_availablity: initialValues?.product_availablity || '',
    products_sold: initialValues?.products_sold.map((val: any) => val.id) || [],
  });
  const navigate = useNavigate();
  const [toastState, setToastState] = useState('success');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newFormValues = {
      ...formValues,
      products_sold: props.products.filter((product) => {
        return formValues.products_sold.includes(product.id);
      }),
    };
    try {
      const url = 'http://localhost:3001/vendors';
      if (mode === 'edit') {
        await axios
          .put(`${url}/${(props.initialValues as any).id}`, newFormValues)
          .then(() => {
            setToastState('success');
          });
      } else if (mode === 'new') {
        await axios.post(url, formValues).then(() => {
          setToastState('success');
        });
      }
    } catch (error) {
      console.log(error);
      setToastState('error');
    }
    setOpen(true);
  };

  const handleChange = (field: any, value: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleMultiSelectChange = (event: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        products_sold: event.target.value,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate('/vendors');
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Vendor Entry Form</div>
      <form className={`${styles.form_container}`}>
        <div>
          <div className={styles.form_field}>
            <TextField
              id="outlined-basic-1"
              label="Vendor Name"
              variant="outlined"
              value={formValues.name}
              onChange={(event: any) =>
                handleChange('name', event.target.value)
              }
            />
          </div>

          <div className={styles.form_field}>
            <TextField
              id="outlined-basic-2"
              label="Email"
              variant="outlined"
              value={formValues.email}
              onChange={(event: any) =>
                handleChange('email', event.target.value)
              }
            />
          </div>
        </div>

        <div>
          <div className={styles.form_field}>
            <TextField
              id="outlined-basic-4"
              label="Phone"
              variant="outlined"
              value={formValues.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
            />
          </div>

          <div className={styles.form_field}>
            <TextField
              id="outlined-basic-6"
              label="Adress"
              variant="outlined"
              value={formValues.address}
              onChange={(event) => handleChange('address', event.target.value)}
            />
          </div>
        </div>

        <div>
          <div className={styles.form_field}>
            {/* Checkout this style EMRE */}
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Product Availablity
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formValues.product_availablity}
                label="Product Availablity"
                onChange={(event) =>
                  handleChange('product_availablity', event.target.value)
                }
              >
                {vendorAvailablity.map((item: any) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={styles.form_field}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Products</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={formValues.products_sold}
                onChange={handleMultiSelectChange}
                input={<OutlinedInput label="Products" />}
                MenuProps={MenuProps}
              >
                {props.products.map((product: Product) => (
                  <MenuItem key={product.productName} value={product.id}>
                    {product.productName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </form>

      <div className={styles.submit_button_container}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {props.mode === 'edit' ? 'Edit' : 'Submit'}
        </Button>
      </div>

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

export default VendorEntryForm;
