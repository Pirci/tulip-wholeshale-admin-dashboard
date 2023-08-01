import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

export interface SimpleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onHandleColorChange: (color: string) => void;
}

function rgbToHex(red: number, green: number, blue: number) {
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');
  return `#${redHex}${greenHex}${blueHex}`;
}

export default function ColorPickerDialog(props: SimpleDialogProps) {
  const { open, setOpen, onHandleColorChange } = props;
  const initialRgbState = { red: 0, green: 0, blue: 0 };
  const [rgb, setRgb] = useState(initialRgbState);
  const [rgbError, setRgbError] = useState({
    red: false,
    green: false,
    blue: false,
  });

  const handleClick = () => {
    const hexColor = rgbToHex(rgb.red, rgb.green, rgb.blue);
    onHandleColorChange(hexColor);
    setOpen(false);
  };

  const handleClose = () => {
    setRgb(initialRgbState);
    setOpen(false);
  };

  const handleColorChange = (
    colorKey: 'red' | 'green' | 'blue',
    value: string
  ) => {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 255) {
      setRgbError({ ...rgbError, [colorKey]: true });
      return;
    }
    setRgbError({ ...rgbError, [colorKey]: false });
    setRgb({ ...rgb, [colorKey]: parsedValue });
  };

  useEffect(() => {
    if (!open) {
      setRgb({ red: 0, green: 0, blue: 0 });
    }
  }, [open]);

  const colors: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Color</DialogTitle>
      <Grid container spacing={2} justifyContent="center" padding={2}>
        {colors.map((color) => (
          <Grid item xs={12} key={color}>
            <TextField
              id={`outlined-basic-${color}`}
              label={`${
                color.charAt(0).toUpperCase() + color.slice(1)
              } (0-255)`}
              variant="outlined"
              type="number"
              error={rgbError[color]}
              helperText={
                rgbError[color] ? 'Please enter a value between 0-255.' : ''
              }
              style={{ minWidth: '150px' }}
              inputProps={{ min: 0, max: 255, step: 1 }}
              onChange={(e) => handleColorChange(color, e.target.value)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={Object.values(rgbError).some((value) => value)}
          >
            Add Color
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
