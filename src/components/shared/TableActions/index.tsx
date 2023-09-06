// src\components\shared\TableActions\index.tsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Product } from '../../../../src/models/product';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../CustomDialog';
import { DialogStateProps } from '../../Customers/CustomerEntryForm';

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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState({
    title: '',
    description: '',
    onConfirm: () => {},
    onCancel: () => {},
  } as DialogStateProps);

  const handleDeleteClick = () => {
    setDialogState({
      title: 'Delete Operation',
      description: 'Are you sure you want to delete this item?',
      onConfirm: handleConfirmDelete,
      onCancel: handleCloseDialog,
    });
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteRowAfterSelected();
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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

      <CustomDialog
        open={isDialogOpen}
        title={dialogState.title}
        description={dialogState.description}
        onConfirm={dialogState.onConfirm as any}
        onCancel={dialogState.onCancel}
      />
    </div>
  );
};

export default TableActions;
