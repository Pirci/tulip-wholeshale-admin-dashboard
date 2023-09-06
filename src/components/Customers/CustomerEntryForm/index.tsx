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
import { useEffect, useRef, useState } from 'react';
import { levels } from '../../../constants/levels';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Customer } from '../../../models/customer';
import CustomDialog from '../../shared/CustomDialog';

interface Props {
  mode: 'edit' | 'new';
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    level: string;
  };
}

const emptyCustomerObject: Customer = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  level: '',
};

export interface DialogStateProps{
  title: string;
  description: string;
  onConfirm: {};
  onCancel: {};
}

export const CustomerEntryForm = (props: Props) => {
  const navigate = useNavigate();
  const { initialValues } = props;
  const [formValues, setFormValues] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
    level: initialValues?.level || '',
  });
  const [toastState, setToastState] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const inputRef = useRef({} as HTMLInputElement);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState({
    title: '',
    description: '',
    onConfirm: {},
    onCancel: {},
  } as DialogStateProps);

  const handleSubmitDialogOpen = () => {
    setDialogState({
      title: 'Submit',
      description: 'Are you sure you want to submit this item?',
      onConfirm: handleSubmit,
      onCancel: handleDialogClose,
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const url = 'http://localhost:4000/customers'; // Update with your API endpoint
      if (props.mode === 'edit') {
        await axios
          .put(`${url}/${(props.initialValues as any).id}`, formValues)
          .then(() => {
            setToastState('success');
          });
      } else if (props.mode === 'new') {
        await axios.post(url, formValues).then(() => {
          setToastState('success');
          setFormValues(emptyCustomerObject);
        });
      }
    } catch (error) {
      console.log(error);
      setToastState('error');
    }
    setIsSnackbarOpen(true);
    setIsDialogOpen(false);
  };

  const handleRadioChange = (event: any) => {
    console.log(event.target.value);
    setFormValues((prev) => {
      return {
        ...prev,
        level: event.target.value,
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

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleBack = () => {
    navigate('/customers');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Customer Entry Form</div>
      <form className={`${styles.form_container}`}>
        <div className="w-100 flex flex-row gap-4 justify-center">
          <div>
            <div className={styles.form_field}>
              <TextField
                id="outlined-basic-1"
                inputRef={inputRef}
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
        {props.mode === 'edit' ? (
          <>
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleSubmitDialogOpen}>
              Submit
            </Button>
          </>
        )}
      </div>
      <CustomDialog
        title={dialogState.title}
        description={dialogState.description}
        open={isDialogOpen}
        onConfirm={dialogState.onConfirm}
        onCancel={dialogState.onCancel}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {toastState === 'success' ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            This is a success message!
          </Alert>
        ) : (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            This is a error message!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default CustomerEntryForm;
