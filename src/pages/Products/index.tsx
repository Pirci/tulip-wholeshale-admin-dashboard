import { useState } from 'react';
import styles from './index.module.scss';
import { ProductList } from '../../components/Products/ProductList';
import { ProductEntryForm } from '../../components/Products/ProductEntryForm';
import { Button } from '@mui/material';

const studens = [
  {
    name: 'harun',
    age: 35,
  },
  {
    name: 'haruemren',
    age: 35,
  },
];

interface Student {
  name: string;
  age: number;
}

export default function Products() {
  // console.log('dbg-parent');
  const [activeView, setActiveView] = useState('list');
  // const renderContent = () => {
  //   if (activeView === 'list') {
  //     return <ProductList />;
  //   } else {
  //     return <ProductEntryForm />;
  //   }
  // };

  //wrong function
  const changeArray1 = (array: Student[]) => {
    array[0].age = 33;
    const newArray = [...array];
    return newArray;
  };

  //true function
  const changeArray2 = (array: Student[]) => {
    const newArray = [...array];
    newArray[0].age = 33;
    return newArray;
  };

  changeArray1(studens as any);
  changeArray2(studens as any);

  const handleClick = (val: string) => {
    // console.log(val);
    //extra operations
    setActiveView(val);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.button_container}>
        <Button
          variant="contained"
          className={activeView === 'list' ? styles.active_button : ''}
          // onClick={() => setActiveView("list")}
          onClick={() => handleClick('list')}
        >
          List of Products
        </Button>
        <Button
          variant="contained"
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Enter Product
        </Button>
      </div>
      {/* <div>{renderContent()}</div> */}
      <div>
        {activeView === 'list' ? (
          <ProductList />
        ) : (
          <ProductEntryForm mode="new" />
        )}
      </div>
    </div>
  );
}
