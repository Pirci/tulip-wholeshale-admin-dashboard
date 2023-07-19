import { Alert, Button, Snackbar, TextField } from '@mui/material';
import styles from './index.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  mode: 'edit' | 'new';
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const VendorEntryForm = (props: Props) => {
  const { initialValues } = props;

  const [formValues, setFormValues] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
  });
  const navigate = useNavigate();
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
      </form>

      <div className={styles.submit_button_container}>
        {props.mode === 'edit' ? (
          <>
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleClick}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </>
        )}
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
