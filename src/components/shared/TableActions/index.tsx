import { Button } from '@mui/material';
import { Product } from '../../../../src/models/product';
import { useNavigate } from 'react-router-dom';

interface TableActionsProps {
  selected: Product[] | [];
  deleteRowAfterSelected: () => void;
  tableURLExtension: string;
}

const TableActions: React.FC<TableActionsProps> = ({
  selected,
  deleteRowAfterSelected,
  tableURLExtension,
}) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    deleteRowAfterSelected();
  };

  const handleEditClick = () => {
    if (selected.length === 0) {
      return;
    }
    navigate(`/${tableURLExtension}/edit/${selected[0].id}`);
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
