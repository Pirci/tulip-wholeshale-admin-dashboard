import { Box, Typography } from '@mui/material';

export default function CenterComponent() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        color={'white'}
        display={'flex'}
        justifyContent={'center'}
      >
        Tulip e-commerce project
      </Typography>
    </Box>
  );
}
