import {
  Alert,
  Button,
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
import { levels } from '../../../constants/levels';

interface Props {
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    level: string;
  };
}

export const CustomerEntryForm = (props: Props) => {
  const { initialValues } = props;

  const [formValues, setFormValues] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
    level: initialValues?.level || '',
  });

  const [toastState, setToastState] = useState('success');
  const [open, setOpen] = useState(false);

  const handleClick = (event: any) => {
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
      <form className={`${styles.form_container}`}>
        <div className="w-100 flex flex-row gap-4 justify-center">
          <div>
            <div className={styles.form_field}>
              <TextField
                id="outlined-basic-1"
                label="Customer Name"
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
                onChange={(event) =>
                  handleChange('address', event.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className={styles.form_field}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Level</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={formValues.level}
                name="radio-buttons-group"
                onChange={handleRadioChange}
                className={styles.radio_buttons}
              >
                {levels.map((level) => {
                  return (
                    <FormControlLabel
                      key={level.value}
                      value={level.value}
                      control={<Radio />}
                      label={level.name}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </form>

      <div className={styles.submit_button_container}>
        <Button variant="contained" onClick={handleClick}>
          Submit
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

export default CustomerEntryForm;
