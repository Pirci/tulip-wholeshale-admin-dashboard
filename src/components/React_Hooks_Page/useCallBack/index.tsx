/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import styles from './useCallbackCase1.module.scss';
import { Button, MenuItem, Select, TextField } from '@mui/material';

export default function UseCallbackCase1() {
  const [selectedCase, setSelectedCase] = useState(0);
  //useMemo
  // const returnMeSomething = (): number => {
  //   const randomNumber = Math.floor(Math.random()* 100) ;
  //   console.log('returnMeSomething called');
  //   return randomNumber;
  // }

  //useCallback
  // const dontReturnMeSomething = (): void => {
  //   console.log('dontReturnMeSomething called');
  // }

  return (
    <div className="flex flex-col w-full flex-wrap gap-4">
      <div>
        <div>
          <h1 className="text-3xl font-extrabold mb-4">Case Expanation</h1>
          <p className="text-justify mb-2">
            The provided code showcases various scenarios using the useCallback
            hook in React. The component UseCallbackCase1 consists of different
            cases demonstrating both wrong and correct implementations.
          </p>
          <p className="text-justify mb-2">
            In each case, a component (WrongImplementation1,
            WrongImplementation2, etc.) is rendered, each highlighting a
            specific concept related to useCallback:
          </p>
          <p className="text-justify mb-2">
            WrongImplementation1: Illustrates unnecessary re-renders due to
            non-memoized functions (sum1 and sum2) within useEffect.
            WrongImplementation2: Shows an example of an endless loop within
            useEffect due to a non-memoized function (sum).
            WrongImplementation3: Demonstrates unnecessary re-renders when
            non-memoized function buildArray is used within useEffect.
            WrongImplementation4: Illustrates an endless loop within useEffect
            due to a non-memoized function buildArray, leading to re-renders.
          </p>
          <p className="text-justify mb-2">
            CorrectImplementation1: Uses useCallback to memoize the function sum
            within useEffect, resolving unnecessary re-renders.
            CorrectImplementation2: Employs useCallback to memoize the function
            buildArray within useEffect, eliminating unnecessary re-renders.
            CorrectImplementation3: Addresses the endless loop issue by using
            useCallback to memoize the function buildArray within useEffect.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold mb-2">Case Application</h1>
          <h2 className="text-xl bold">
            Please open the console to see the effect!
          </h2>
        </div>
        <div className="flex flex-col w-full flex-wrap gap-2">
          {selectedCase === 0 && (
            <div className="flex-1">
              <SelectCaseComponent
                selectedCase={selectedCase}
                setSelectedCase={setSelectedCase}
              ></SelectCaseComponent>
            </div>
          )}
          {selectedCase === 1 && (
            <div className="flex-1">
              <WrongImplementation1></WrongImplementation1>
            </div>
          )}
          {selectedCase === 2 && (
            <div className="flex-1">
              <WrongImplementation2></WrongImplementation2>
            </div>
          )}
          {selectedCase === 3 && (
            <div className="flex-1">
              <WrongImplementation3></WrongImplementation3>
            </div>
          )}
          {selectedCase === 4 && (
            <div className="flex-1">
              <WrongImplementation4></WrongImplementation4>
            </div>
          )}
          {selectedCase === 5 && (
            <div className="flex-1">
              <CorrectImplementation1></CorrectImplementation1>
            </div>
          )}
          {selectedCase === 6 && (
            <div className="flex-1">
              <CorrectImplementation2></CorrectImplementation2>
            </div>
          )}
          {selectedCase === 7 && (
            <div className="flex-1">
              <CorrectImplementation3></CorrectImplementation3>
            </div>
          )}
          {selectedCase !== 0 && (
            <div className="flex-1">
              <Button variant={'contained'} onClick={() => setSelectedCase(0)}>
                Back to selection
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SelectCaseComponentProps {
  selectedCase: number;
  setSelectedCase: (selectedCase: number) => void;
}

const SelectCaseComponent = ({
  selectedCase,
  setSelectedCase,
}: SelectCaseComponentProps) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.infoSection}>
        <h1>Select a case to see the effect</h1>
      </div>
      <div className={styles.infoSection}>
        <Select
          className="w-full"
          variant="outlined"
          value={selectedCase}
          onChange={(e) => {
            setSelectedCase(parseInt(e.target.value as string));
          }}
        >
          <MenuItem value="0">Select a case</MenuItem>
          <MenuItem value="1">WrongImplementation1</MenuItem>
          <MenuItem value="2">WrongImplementation2</MenuItem>
          <MenuItem value="3">WrongImplementation3</MenuItem>
          <MenuItem value="4">WrongImplementation4</MenuItem>
          <MenuItem value="5">CorrectImplementation1</MenuItem>
          <MenuItem value="6">CorrectImplementation2</MenuItem>
          <MenuItem value="7">CorrectImplementation3</MenuItem>
        </Select>
      </div>
    </div>
  );
};

const WrongImplementation1 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);
  // Case explanation: no useCallback used, there are unnecessary re-renders
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sum1 = () => 4 + 5;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sum2 = () => num1 + num2;
  useEffect(() => {
    console.log(`New sum1: Value: ${sum1}`);
    console.log(`New sum2: Value: ${sum2}`);
  }, [sum1, sum2]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </div>
  );
};

const WrongImplementation2 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);
  // Case explanation:: no useCallback used, there are unnecessary re-renders, also we have endless loop here,
  // but react is smart enough to stop it
  const [result, setResult] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sum = () => num1 + num2;

  useEffect(() => {
    console.log(`New sum: Value: ${sum}`);
    setResult(sum());
  }, [sum]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </div>
  );
};

const WrongImplementation3 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);

  // Case explanation:, no useCallback used, there are unnecessary re-renders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buildArray = () => [num1, num2];

  useEffect(() => {
    console.log(`New array: ${buildArray()}`);
  }, [buildArray]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        {/* <p>Result: {JSON.stringify(result)}</p> */}
      </div>
    </div>
  );
};

const WrongImplementation4 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);

  // Case explanation:, no useCallback used, there are unnecessary re-renders, also we have endless loop here
  // because of setResult, react is not smart enough to stop it
  const [result, setResult] = useState([] as number[]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buildArray = () => [num1, num2];

  useEffect(() => {
    console.log(`New array: ${buildArray()}`);
    setResult(buildArray());
  }, [buildArray]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </div>
  );
};

const CorrectImplementation1 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);

  // Case explanation:, we used useCallback, and there is no unnecessary re-renders anymore
  const [result, setResult] = useState(0);

  const sum = useCallback(() => num1 + num2, [num1, num2]);

  useEffect(() => {
    console.log(`New sum: Value: ${sum}`);
    setResult(sum());
  }, [sum]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </div>
  );
};

const CorrectImplementation2 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);
  // Case explanation:, we emplyed useCallback, and there is no unnecessary re-renders anymore
  const buildArray = useCallback(() => [num1, num2], [num1, num2]);
  useEffect(() => {
    console.log(`New array: ${buildArray()}`);
  }, [buildArray]);
  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        {/* <p>Result: {JSON.stringify(result)}</p> */}
      </div>
    </div>
  );
};

const CorrectImplementation3 = () => {
  const [userInput, setUserInput] = useState('');
  const [num1] = useState(4);
  const [num2] = useState(5);

  // Case explanation: useCallback used, we solved the endless loop problem, and there is no unnecessary re-renders anymore
  const [result, setResult] = useState([] as number[]);
  const buildArray = useCallback(() => [num1, num2], [num1, num2]);
  useEffect(() => {
    console.log(`New array: ${buildArray()}`);
    setResult(buildArray());
  }, [buildArray]);

  return (
    <div className={styles.case_container}>
      <TextField
        className="mb-4"
        type="text"
        label="Enter an input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className={styles.infoSection}>
        <h1>Output: {userInput || '--'}</h1>
        <p>Result: {JSON.stringify(result)}</p>
      </div>
    </div>
  );
};
