import { Button } from '@mui/material';
import { Product } from '../../../../src/models/product';

interface TableActionsProps {
  selected: Product[] | [];
  deleteRowAfterSelected: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  selected,
  deleteRowAfterSelected,
}) => {
  const handleDeleteClick = () => {
    console.log('delete');
    deleteRowAfterSelected();
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
        disabled={selected.length === 0}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        style={{ minWidth: '120px' }}
        onClick={handleEditClick}
        disabled={selected.length === 0}
      >
        Edit
      </Button>
    </div>
  );
};

export default TableActions;
