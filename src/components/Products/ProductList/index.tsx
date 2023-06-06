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
  // Button,
} from '@mui/material';
import styles from './index.module.scss';
// import { products } from '../../../constants/products';
import React, { useState } from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

interface Product {
  productName: string;
  date: string;
  color: string;
  price: number;
  amount: number;
  isStockAvailable: boolean;
}

export const ProductList = () => {
  //We shall not do this
  // console.log(document.getElementById('#outlined-basic-2').classList.add('my-awasome-class'));
  const [products, setProducts] = useState<Product[]>([]);
  const [formValues, setFormValues] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsLength, setProductsLength] = useState(0)
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products?_page=${page}]&_limit=${rowsPerPage}`
        );

        // Check if the content type is JSON before trying to parse it.
        const contentType = response.headers.get('content-type');
        let total = response.headers.get('X-Total-Count');
        setProductsLength(Number(total));
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.log('No JSON data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]); // Empty dependency array ensures this runs once on component mount.

  // const [counter, setCounter] = useState(0);
  // const [clicked, setClicked] = useState(true);
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

  // const callMe = (val: string) => {
  //   return val.toUpperCase();
  // };

  // const handleButtonClick = () => {
  //   setClicked((prev) => {
  //     return !prev;
  //   });
  // };

  // Invokes in each rerender
  // useEffect(() => {
  //   console.log(callMe('harun'));
  // });

  // Invokes only first render
  // useEffect(() => {
  //   console.log(callMe('harun'));
  // }, []);

  // Invokes selectively when the state in the array is changed
  // useEffect(() => {
  //   console.log(callMe('i am page'));
  // }, [rowsPerPage]);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prev) => prev + 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [clicked]);

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>List of Products</div>
      <div>
        <TextField
          id="outlined-basic-2"
          label="Filter"
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
              {(products && rowsPerPage > 0
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
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      {/* <Button variant='contained' onClick={handleButtonClick}>
        click me
      </Button> */}
      {/* <p>{counter}</p> */}
    </div>
  );
};
