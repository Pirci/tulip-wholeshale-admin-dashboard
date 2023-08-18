import { Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UseMemo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full flex-wrap gap-4">
      <Button
        sx={{
          textAlign: 'left',
          fontSize: '2rem',
          border: '1px solid',
          width: '100%',
          marginBottom: '1rem',
          backgroundColor: 'lightblue',
          '&:hover': {
            backgroundColor: 'deepskyblue',
          },
        }}
        onClick={() => navigate('/react-hooks-page/useMemo/Example1')}
      >
        Example1
      </Button>

      <Button
        sx={{
          textAlign: 'left',
          fontSize: '2rem',
          border: '1px solid',
          width: '100%',
          marginBottom: '1rem',
          backgroundColor: 'lightgreen', // Just to differentiate
          '&:hover': {
            backgroundColor: 'limegreen',
          },
        }}
        onClick={() => navigate('/react-hooks-page/useMemo/Example2')}
      >
        Example2
      </Button>

      <Outlet />
    </div>
  );
}
