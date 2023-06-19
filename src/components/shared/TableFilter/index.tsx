import TextField from '@mui/material/TextField';

interface Props {
  formValuesChild: string;
  setFormValuesChild: (val: string) => void;
}

export default function TableFilter({
  formValuesChild,
  setFormValuesChild,
}: Props) {
  const handleChange = (inputValue: string) => {
    setFormValuesChild(inputValue);
  };
  return (
    <div>
      <TextField
        id="outlined-basic-2"
        label="Filter"
        variant="outlined"
        value={formValuesChild}
        onChange={(event: any) => handleChange(event.target.value)}
      />
    </div>
  );
}
