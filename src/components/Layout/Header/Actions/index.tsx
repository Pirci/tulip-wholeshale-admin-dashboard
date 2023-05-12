import { Avatar, IconButton, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Actions() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
    </Stack>
  );
}
