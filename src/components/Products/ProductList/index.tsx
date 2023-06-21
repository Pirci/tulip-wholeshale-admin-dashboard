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
  // Button,
} from '@mui/material';
import { Checkbox } from '@mui/material';
import styles from './index.module.scss';
// import { products } from '../../../constants/products';
import React, { useState } from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import TableFilter from '../../shared/TableFilter';
import TableActions from '../../shared/TableActions';

interface Product {
  id: number;
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsLength, setProductsLength] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  // const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // const handleSelect = (id: number) => {
  //   if (selected.includes(id)) {
  //     setSelected(selected.filter((item) => item !== id));
  //   } else {
  //     setSelected([...selected, id]);
  //   }
  // };

  const handleSelect = (product: Product) => {
    if (selected.includes(product.id)) {
      setSelected(selected.filter((item) => item !== product.id));
    } else {
      console.log(product.productName); // print the product name here
      setSelected([...selected, product.id]);
    }
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products?_page=${
            page + 1
          }]&_limit=${rowsPerPage}`
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
  const [formValuesParent, setFormValuesParent] = useState('');

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Stock availablity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(products && rowsPerPage > 0
                ? products.filter((f) => {
                    if (formValuesParent.length > 2) {
                      return f.productName
                        .toLowerCase()
                        .includes(formValuesParent.toLowerCase());
                    } else {
                      return true;
                    }
                  })
                : // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  products
              ).map((row, index) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                    backgroundColor: selected.includes(row.id)
                      ? '#f0f0f0'
                      : 'white',
                  }}
                  onClick={() => handleSelect(row)}
                >
                  <TableCell padding="checkbox">
                    {' '}
                    <Checkbox checked={selected.includes(row.id)} />
                  </TableCell>
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
                    <TableActions />
                  </div>
                </TableCell>
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
