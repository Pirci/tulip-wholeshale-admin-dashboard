import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

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
  const colorObserverRef = useRef({} as HTMLDivElement);
  const handleColorChange = (color: string) => {
    setColor(color);
  };

  useEffect(() => {
    if (color) {
      colorObserverRef.current.style.backgroundColor = color;
    }
  }, [color]);

  return (
    <div className={styles.main_container}>
      <div className={styles.color_observer_container} ref={colorObserverRef}></div>
      <div className={styles.color_picker}>
        <div className={styles.color_picker_title}>
          Color Picker
        </div>
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
        </div>
      </div>
    </div>
  );
}
