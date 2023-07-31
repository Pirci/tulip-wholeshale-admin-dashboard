import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

export interface SimpleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onHandleColorChange: (color: string) => void;
}

export default function ColorPickerDialog(props: SimpleDialogProps) {
  const { open, setOpen, onHandleColorChange } = props;
  const [rgb, setRgb] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  const handleClick = () => {
    onHandleColorChange(`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <div>
        <TextField
          id="outlined-basic"
          label="Red"
          value={rgb.red}
          variant="outlined"
          type="number"
          onChange={(e) => setRgb({ ...rgb, red: parseInt(e.target.value) })}
        />
        <TextField
          id="outlined-basic"
          label="Blue"
          value={rgb.blue}
          variant="outlined"
          type="number"
          onChange={(e) => setRgb({ ...rgb, blue: parseInt(e.target.value) })}
        />
        <TextField
          id="outlined-basic"
          label="Green"
          value={rgb.green}
          variant="outlined"
          type="number"
          onChange={(e) => setRgb({ ...rgb, green: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleClick}>
          Add Color
        </Button>
      </div>
    </Dialog>
  );
}
