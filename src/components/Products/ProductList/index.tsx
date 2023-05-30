import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableFooter,
  TablePagination,
} from '@mui/material';
import styles from './index.module.scss';
import { products } from '../../../constants/products';
import { useState } from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

export const ProductList = () => {
  const [formValues, setFormValues] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (formValue: string) => {
    console.log(formValue);
    setFormValues(formValue);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>List of Products</div>
      <div>
        <TextField
          id="outlined-basic-2"
          label="Search"
          variant="outlined"
          value={formValues}
          onChange={(event: any) => handleChange(event.target.value)}
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">date</TableCell>
                <TableCell align="right">color</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">amount</TableCell>
                <TableCell align="right">isStockAvailable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? products
                    .filter((f) => {
                      if (formValues.length > 2) {
                        return f.productName
                          .toLowerCase()
                          .includes(formValues.toLowerCase());
                      } else {
                        return true;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : products
              ).map((row) => (
                <TableRow
                  key={row.productName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.productName}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.color}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    {row.isStockAvailable ? 'Exist' : 'Not Exist'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={products.length}
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
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
