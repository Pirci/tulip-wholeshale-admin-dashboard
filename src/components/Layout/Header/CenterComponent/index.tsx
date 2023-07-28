import { Box, Typography } from '@mui/material';
import styles from './index.module.scss';

interface CenterComponentProps {
  title: string;
  subtitle?: string;
}

export default function CenterComponent(props: CenterComponentProps) {

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        className={styles.titleText}
        variant='h5'
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
          className={styles.subtitleText}
          variant='h5'
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
