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
import { orders } from '../../../constants/orders';
import { useState } from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

export const RecentOrders = () => {
  const [formValues, setFormValues] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredOrders =
    formValues.length >= 3
      ? orders.filter((order) =>
          order.productName.toLowerCase().includes(formValues.toLowerCase())
        )
      : orders;

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

  const displayedOrders =
    rowsPerPage > 0
      ? filteredOrders.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredOrders;

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>Recent Orders</div>
      <div>
        <TextField
          id='outlined-basic-2'
          label='Search'
          variant='outlined'
          value={formValues}
          onChange={(event: any) => handleChange(event.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.map((row) => (
              <TableRow
                key={row.orderId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.orderId}
                </TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.orderDate.toLocaleDateString()}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={filteredOrders.length} // you should count the filtered orders, not the total
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
  );
};
