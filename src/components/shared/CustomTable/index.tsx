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
  products: any[];
  productsLength: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  displayedProducts: TableCellProps[];
}

export default function CustomTable({
  products,
  productsLength,
  onPageChange,
  onRowsPerPageChange,
  displayedProducts,
}: Props) {
  const [formValuesParent, setFormValuesParent] = useState('');
  const [selected, setSelected] = useState<any[] | []>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelect = (product: any) => {
    const isProductSelected = selected.some(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (isProductSelected) {
      setSelected([]);
    } else {
      setSelected([product]);
      console.log('Selected product:', product);
    }
  };

  const deleteRowAfterSelected = () => {
    if (selected.length === 0) {
      return;
    }

    // Find the product in products array that is selected
    const selectedIndex = products.findIndex(
      (product) => product.id === selected[0].id
    );

    // If the product is found, delete it from products array
    // if (selectedIndex !== -1) {
    //   setProducts((products) => {
    //     const newProducts = [...products];
    //     newProducts.splice(selectedIndex, 1);
    //     return newProducts;
    //   });
    // }
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

  useEffect(() => {
    console.log(selected.map((selectedProduct) => selectedProduct.productName));
  }, [selected]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {displayedProducts.map((cell, index) => {
                return (
                  <TableCell align={index !== 0 ? 'right' : undefined}>
                    {cell.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              products &&
              (formValuesParent.length > 2
                ? products.filter((f) =>
                    f.productName
                      .toLowerCase()
                      .includes(formValuesParent.toLowerCase())
                  )
                : products)
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
                {displayedProducts.map((cell, index) => {
                  console.log(row);

                  if (typeof row[cell.value] === 'boolean') {
                    return (
                      <TableCell align="right">
                        {row[cell.value] ? 'Exist' : 'Not Exist'}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell align={index !== 0 ? 'right' : undefined}>
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
                count={productsLength}
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
