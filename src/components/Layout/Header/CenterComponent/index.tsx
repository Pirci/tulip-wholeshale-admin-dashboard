import { Box, Typography } from '@mui/material';

interface CenterComponentProps {
  title: string;
  subtitle?: string;
}

export default function CenterComponent(props: CenterComponentProps) {
  // console.log(props.title);
  // console.log(props.subtitle);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        color={'E1D4BB'}
        fontWeight={'bold'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        margin={'0px'}
      >
        {props.title}
      </Typography>
      {props.subtitle ? (
        <Typography
          variant="h5"
          gutterBottom
          color={'E1D4BB'}
          fontWeight={'bold'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'0px'}
        >
          {props.subtitle}
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
}
