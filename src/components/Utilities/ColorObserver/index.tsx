import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import ColorPickerDialog from '../ColorPickerDialog';

const colorList = [
  { name: 'red', hex: '#ff0000' },
  { name: 'green', hex: '#00ff00' },
  { name: 'blue', hex: '#0000ff' },
  { name: 'yellow', hex: '#ffff00' },
  { name: 'cyan', hex: '#00ffff' },
  { name: 'magenta', hex: '#ff00ff' },
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#ffffff' },
];

export default function ColorObserver() {
  const [color, setColor] = useState('white');
  const [open, setOpen] = useState(false);
  const colorObserverRef = useRef({} as HTMLDivElement);
  const [selectedColor, setSelectedColor] = useState({
    name: 'white',
    hex: '#ffffff',
  });

  const handleColorChange = (hex: string) => {
    const color = colorList.find((color) => color.hex === hex);
    if (color) {
      setSelectedColor(color);
    }
  };

  const handleAddNewColor = (hex: string) => {
    const newColor = { name: hex, hex };
    colorList.push(newColor);
    setSelectedColor(newColor);
    setOpen(false);
  };

  const handleOpenColorPickerDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (color) {
      colorObserverRef.current.style.backgroundColor = color;
    }
  }, [color]);

  return (
    <div className={styles.main_container}>
      <div
        className={styles.color_observer_container}
        ref={colorObserverRef}
        style={{ backgroundColor: selectedColor.hex }}
      ></div>
      <div className={styles.color_picker}>
        <div className={styles.color_picker_title}>Color Picker</div>
        <div className={styles.color_picker_content}>
          {colorList.map((item) => {
            return (
              <button
                className={styles.color_picker_content_item}
                style={{ backgroundColor: item.hex }}
                onClick={() => handleColorChange(item.hex)}
              >
                {item.name}
              </button>
            );
          })}
          <button
            className={styles.color_picker_content_item}
            style={{ backgroundColor: 'grey' }}
            onClick={() => handleOpenColorPickerDialog()}
          >
            Add New Color
          </button>
        </div>
      </div>
      <ColorPickerDialog
        open={open}
        setOpen={setOpen}
        onHandleColorChange={handleAddNewColor}
      />
    </div>
  );
}