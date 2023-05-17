import { Button } from '@mui/material';
import { useState } from 'react';

export default function Orders() {
  // The example of showing that standart variables do not render the view
  // let counter = 0;

  // const handleClick = () => {
  //   counter++;
  //   console.log(counter);
  // };

  const [counter, setCounter] = useState(0);

  // Callback fonksiyon kullanılacak
  // CAllback fonksiyonun prev değeri, fonksiyondan gelen önceki değeri kullanılacak
  const handleClick = () => {
    setCounter((old) => {
      console.log(old + 1);
      return old + 1;
    });
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ color: 'white' }}
      >
        Counter
      </Button>
      <h1>{counter}</h1>
    </div>
  );
}
