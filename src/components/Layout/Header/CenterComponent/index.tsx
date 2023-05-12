import { Box, Typography } from '@mui/material';

export default function CenterComponent() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant='h5'
        gutterBottom
        color={"E1D4BB"}
        fontWeight={"bold"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0px"}
      >
        Tulip e-commerce project
      </Typography>
    </Box>
  );
}
