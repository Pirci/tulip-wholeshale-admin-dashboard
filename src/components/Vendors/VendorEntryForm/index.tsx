import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import styles from './index.module.scss';
import { useState } from 'react';
import { colors } from '../../../constants/colors';

interface Props {}

export const VendorEntryForm = (props: Props) => {
  console.log('dbg-child-2');
  const [first, setfirst] = useState(false);
  const [formValues, setFormValues] = useState({
    vendorName: '',
    vendorCategory: '',
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

  const handleClickTrial = () => {
    setfirst((prev) => {
      console.log(!prev);
      return !prev;
    });
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

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Vendor Entry Form</div>
      <form className={styles.form_container}>
        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-1'
            label='Vendor Name'
            variant='outlined'
            value={formValues.vendorName}
            onChange={(event: any) =>
              handleChange('vendorName', event.target.value)
            }
          />
        </div>

        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-2'
            label='Category'
            variant='outlined'
            value={formValues.vendorCategory}
            onChange={(event: any) =>
              handleChange('vendorCategory', event.target.value)
            }
          />
        </div>

        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-4'
            label='Price'
            variant='outlined'
            value={formValues.price}
            onChange={(event) => handleChange('price', event.target.value)}
          />
        </div>

        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-5'
            label='Amount'
            variant='outlined'
            value={formValues.amount}
            onChange={(event) => handleChange('amount', event.target.value)}
          />
        </div>

        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-6'
            label='Vendor'
            variant='outlined'
            value={formValues.vendor}
            onChange={(event) => handleChange('vendor', event.target.value)}
          />
        </div>

        <div className={styles.form_field}>
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='center'
          >
            <Typography>False</Typography>
            <AntSwitch
              checked={formValues.isStockAvailable}
              onChange={(event) =>
                handleChange('isStockAvailable', event.target.checked)
              }
              inputProps={{ 'aria-label': 'ant design' }}
            />
            <Typography>True</Typography>
          </Stack>
        </div>

        <div className={styles.form_field}>
          <TextField
            id='outlined-basic-8'
            label='Demand Rating'
            variant='outlined'
            value={formValues.demandRating}
            onChange={(event) =>
              handleChange('demandRating', event.target.value)
            }
          />
        </div>

        <div className={styles.form_field}>
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Colors</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='blue'
              name='radio-buttons-group'
              onChange={handleRadioChange}
              className={styles.radio_buttons}
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
        </div>
      </form>
      <h1>{first}</h1>

      <div className={styles.submit_button_container}>
        <button type='submit' onClick={handleClick}>
          Submit
        </button>

        <button onClick={handleClickTrial}>Trial</button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {toastState === 'success' ? (
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            This is a success message!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            This is a error message!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
