import { Button } from '@mui/material';

export default function TableActions() {
    
  const handleDeleteClick = () => {
    console.log('delete');
  };

  const handleEditClick = () => {
    console.log('edit');
  };

  return (
    <div className="flex-1 flex justify-end items-center gap-2">
      <Button
        variant="contained"
        color="error"
        style={{ minWidth: '120px' }}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        style={{ minWidth: '120px' }}
        onClick={handleEditClick}
      >
        Edit
      </Button>
    </div>
  );
}
