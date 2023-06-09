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
import React, { useState } from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { ProductSold } from '../../../../src/models/vendors';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  product_availablity: string;
  products_sold: Array<ProductSold>;
}

export const VendorList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formValues, setFormValues] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vendorsLength, setVendorsLength] = useState(0);

  React.useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/vendors?_page=${
            page + 1
          }]&_limit=${rowsPerPage}`
        );
        const contentType = response.headers.get('content-type');
        let total = response.headers.get('X-Total-Count');
        setVendorsLength(Number(total));
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setVendors(data);
        } else {
          console.log('No JSON data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVendors();
  }, [page, rowsPerPage]);

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
      <div className={styles.page_header}>List of Vendors</div>
      <div>
        <TextField
          id='outlined-basic-2'
          label='Filter'
          variant='outlined'
          value={formValues}
          onChange={(event: any) => handleChange(event.target.value)}
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Vendors Name</TableCell>
                <TableCell align='right'>ID</TableCell>
                <TableCell align='right'>Email</TableCell>
                <TableCell align='right'>Phone</TableCell>
                <TableCell align='right'>Address</TableCell>
                <TableCell align='right'>Product availablity</TableCell>
                <TableCell align='right'>Products sold</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(vendors && rowsPerPage > 0
                ? vendors.filter((f) => {
                    if (formValues.length > 2) {
                      return f.name
                        .toLowerCase()
                        .includes(formValues.toLowerCase());
                    } else {
                      return true;
                    }
                  })
                : vendors
              ).map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.id}</TableCell>
                  <TableCell align='right'>{row.email}</TableCell>
                  <TableCell align='right'>{row.phone}</TableCell>
                  <TableCell align='right'>{row.address}</TableCell>
                  <TableCell align='right'>{row.product_availablity}</TableCell>
                  <TableCell align='right'>
                    {row.products_sold.map((product: ProductSold) => (
                      <div key={product.id}>
                        {product.name} - {product.price}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={vendorsLength}
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
