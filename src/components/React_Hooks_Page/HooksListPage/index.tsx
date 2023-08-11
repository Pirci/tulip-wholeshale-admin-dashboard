import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const hookItems = [
  {
    text: 'useState',
    route: 'useState',
  },
  {
    text: 'useEffect',
    route: 'useEffect',
  },
  {
    text: 'useContext',
    route: 'useContext',
  },
  {
    text: 'useMemo',
    route: 'useMemo',
  },
  {
    text: 'useCallback',
    route: 'useCallback',
  },
  {
    text: 'useRef',
    route: 'useRef',
  },
];
export default function HooksListPAge() {
  const navigate = useNavigate();
  const handleListItemClick = (route: any) => {
    navigate(route);
  };

  return (
    <div>
      <List component="nav" aria-label="secondary mailbox folder">
        {hookItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleListItemClick(item.route)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
