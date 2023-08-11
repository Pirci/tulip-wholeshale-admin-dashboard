import { Button, Divider, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';

export default function UseMemo() {
  return (
    <div className="flex flex-col w-full flex-wrap gap-4">
      <div>
        <div>
          <h1 className="text-3xl font-extrabold mb-4">Case Expanation</h1>
          <p>Will be provided soon.</p>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold mb-2">Case Application</h1>
          <h2 className="text-xl bold">
            Please open the console to see the effect!
          </h2>
        </div>
        <div className="flex flex-row w-full flex-wrap gap-4">
          <div className="flex-1">
            <WrongImplementation></WrongImplementation>
          </div>
          <div className="flex-1">
            <CorrectImplementation></CorrectImplementation>
          </div>
        </div>
      </div>
    </div>
  );
}

const WrongImplementation = () => {
  const [counter, setCounter] = useState(0);
  const [items] = useState(generateItems(300));
  const [userInput, setUserInput] = useState<string>('');

  const selectedItem = items.find((item) => {
    console.log('unnecessary-rerender');
    return item.id === counter;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const enterDescription = () => {
    const newItems = [...items];
    newItems[counter].description = userInput;
    setUserInput('');
    console.log(newItems);
  };

  function generateItems(numberOfItems: number) {
    const items = [];
    for (let i = 0; i < numberOfItems; i++) {
      items.push({
        id: i,
        isSelected: i === counter,
        description: '',
      });
    }
    return items;
  }

  return (
    <div className="border-2">
      <div className="p-4">
        <div className="w-full text-3xl my-4">
          <h1 className="font-extrabold  text-red-600">Wrong Functioning</h1>
        </div>
        <h2>Number Of Elements: {items.length}</h2>
        <h2>Selected Item: {selectedItem?.id}</h2>
        <div className="flex flex-row gap-4 justify-center">
          <Button
            variant="contained"
            onClick={() => setCounter((prev) => prev - 1)}
          >
            Decrease
          </Button>
          <Button
            variant="contained"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            Increase
          </Button>
        </div>
      </div>
      <Divider></Divider>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2>Enter Description</h2>
        <TextField
          className="mb-4"
          type="text"
          label="Enter a text"
          value={userInput}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={() => enterDescription()}>
          Enter Description
        </Button>
      </div>
      <Divider></Divider>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2>Selected Item: {selectedItem?.id}</h2>
        <h2>
          Item description: {selectedItem?.description ?? 'No description'}
        </h2>
      </div>
    </div>
  );
};

function CorrectImplementation() {
  const [counter, setCounter] = useState(0);
  const [items] = useState(generateItems(300));
  const [userInput, setUserInput] = useState<string>('');

  const selectedItem = useMemo(
    () =>
      items.find((item) => {
        console.log('unnecessary-rerender');
        return item.id === counter;
      }),
    [counter, items]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const enterDescription = () => {
    const newItems = [...items];
    newItems[counter].description = userInput;
    setUserInput('');
    console.log(newItems);
  };

  function generateItems(numberOfItems: number) {
    const items = [];
    for (let i = 0; i < numberOfItems; i++) {
      items.push({
        id: i,
        isSelected: i === counter,
        description: '',
      });
    }
    return items;
  }

  return (
    <div className="border-2">
      <div className="p-4">
        <div className="w-full text-3xl my-4">
          <h1 className="font-extrabold  text-green-600">
            Correct Functioning
          </h1>
        </div>
        <h2>Number Of Elements: {items.length}</h2>
        <h2>Selected Item: {selectedItem?.id}</h2>
        <div className="flex flex-row gap-4 justify-center">
          <Button
            variant="contained"
            onClick={() => setCounter((prev) => prev - 1)}
          >
            Decrease
          </Button>
          <Button
            variant="contained"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            Increase
          </Button>
        </div>
      </div>
      <Divider></Divider>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2>Enter Description</h2>
        <TextField
          className="mb-4"
          type="text"
          label="Enter a text"
          value={userInput}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={() => enterDescription()}>
          Enter Description
        </Button>
      </div>
      <Divider></Divider>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h2>Selected Item: {selectedItem?.id}</h2>
        <h2>
          Item description: {selectedItem?.description ?? 'No description'}
        </h2>
      </div>
    </div>
  );
}
