import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import TableFilter from '../../shared/TableFilter';
import TableActions from '../../shared/TableActions';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

interface TableCellProps {
  label: string;
  value: string;
}

interface Props {
  records: any[];
  recordsLength: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onRecordsDelete: (recordId: number) => void;
  displayedItems: TableCellProps[];
  tableURLExtension: string;
}

export default function CustomTable({
  records,
  recordsLength,
  onPageChange,
  onRowsPerPageChange,
  onRecordsDelete,
  displayedItems,
  tableURLExtension,
}: Props) {
  const [formValuesParent, setFormValuesParent] = useState('');
  const [selected, setSelected] = useState<any[] | []>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelect = (record: any) => {
    const isProductSelected = selected.some(
      (selectedProduct) => selectedProduct.id === record.id
    );

    if (isProductSelected) {
      setSelected([]);
    } else {
      setSelected([record]);
    }
  };

  const deleteRowAfterSelected = () => {
    if (selected.length === 0) {
      return;
    }

    // Find the item in products array that is selected
    const selectedItem = records.find((record) => record.id === selected[0].id);

    if (tableURLExtension) {
      fetch(`http://localhost:3001/${tableURLExtension}/${selectedItem.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          onRecordsDelete(selectedItem.id);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('No recordId found');
    }
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    onPageChange(page);
  }, [onPageChange, page]);

  useEffect(() => {
    onRowsPerPageChange(rowsPerPage);
  }, [onRowsPerPageChange, rowsPerPage]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {displayedItems.map((cell, index) => {
                return (
                  <TableCell
                    key={cell.value}
                    align={index !== 0 ? 'right' : undefined}
                  >
                    <span className="font-bold text-lg">{cell.label}</span>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              records &&
              (formValuesParent.length > 2
                ? records.filter((f) =>
                    f.productName
                      .toLowerCase()
                      .includes(formValuesParent.toLowerCase())
                  )
                : records)
            ).map((row) => (
              <TableRow
                hover={!selected.length || selected[0].id !== row.id}
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  backgroundColor:
                    selected.length && selected[0].id === row.id
                      ? 'orange'
                      : 'white',
                }}
                onClick={() => handleSelect(row)}
              >
                {displayedItems.map((cell, index) => {
                  if (typeof row[cell.value] === 'boolean') {
                    return (
                      <TableCell key={cell.value} align="right">
                        {row[cell.value] ? 'Exist' : 'Not Exist'}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={cell.value}
                        align={index !== 0 ? 'right' : undefined}
                      >
                        {row[cell.value]}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={recordsLength}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="p-2 flex flex-row">
                  <TableFilter
                    formValuesChild={formValuesParent}
                    setFormValuesChild={setFormValuesParent}
                  />
                  <TableActions
                    tableURLExtension={tableURLExtension}
                    selected={selected}
                    deleteRowAfterSelected={deleteRowAfterSelected}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
