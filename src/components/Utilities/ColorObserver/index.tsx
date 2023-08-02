import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import ColorPickerDialog from '../ColorPickerDialog';

interface Color {
  id: string;
  name: string;
  hex: string;
}

export default function ColorObserver() {
  const [colors, setColors] = useState<Color[]>([] as Color[]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const colorObserverRef = useRef({} as HTMLDivElement);
  const [lastColor, setLastColor] = useState({} as Color);
  const [selectedColor, setSelectedColor] = useState({
    id: '#ffffff',
    name: 'white',
    hex: '#ffffff',
  });

  const handleColorChange = (hex: string) => {
    const color = colors.find((color) => color.hex === hex);
    if (color) {
      setSelectedColor(color);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/colors').then((response) => {
      response.json().then((data) => {
        setColors(data);
        setLoading(false);
      });
    });
  }, [lastColor]);

  const handleAddNewColor = (hex: string) => {
    const newColor = { id: hex, name: hex, hex: hex };
    fetch('http://localhost:3001/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColor),
    })
      .then(() => {
        setLastColor(newColor);
        setSelectedColor(newColor);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
  };

  const handleOpenColorPickerDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (selectedColor) {
      colorObserverRef.current.style.backgroundColor = selectedColor.hex;
    }
  }, [selectedColor]);

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
          {!loading ? (
            colors?.map((item) => {
              return (
                <button
                  className={styles.color_picker_content_item}
                  style={{ backgroundColor: item.hex }}
                  onClick={() => handleColorChange(item.hex)}
                >
                  {item.name}
                </button>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
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
