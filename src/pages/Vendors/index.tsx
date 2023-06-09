import { useState } from 'react';
import styles from './index.module.scss';
import { VendorList } from '../../components/Vendors/VendorList';
import { VendorEntryForm } from '../../components/Vendors/VendorEntryForm';

// import React from 'react';

// export default function Vendors() {
//   return <div>Vendors</div>;
// }

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

export default function Vendors() {
  // console.log('dbg-parent');
  const [activeView, setActiveView] = useState('list');
  // const renderContent = () => {
  //   if (activeView === 'list') {
  //     return <VendorList />;
  //   } else {
  //     return <VendorEntryForm />;
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
        <button
          className={activeView === 'list' ? styles.active_button : ''}
          // onClick={() => setActiveView("list")}
          onClick={() => handleClick('list')}
        >
          List of Vendors
        </button>
        <button
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Vendor Entry Form
        </button>
      </div>
      {/* <div>{renderContent()}</div> */}
      <div></div>
      {activeView === 'list' ? <VendorList /> : <VendorEntryForm />}
    </div>
  );
}
