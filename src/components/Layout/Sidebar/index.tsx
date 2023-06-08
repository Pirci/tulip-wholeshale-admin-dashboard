import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import {
  MdOutlineProductionQuantityLimits,
  MdContentPasteGo,
  MdArrowForwardIos,
} from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { GiSellCard } from 'react-icons/gi';

const menuItems = [
  { text: 'Dashboard', icon: <AiOutlineDashboard />, route: 'dashboard' },
  { text: 'Orders', icon: <BiPurchaseTagAlt />, route: 'orders' },
  {
    text: 'Products',
    icon: <MdOutlineProductionQuantityLimits />,
    route: 'products',
  },
  { text: 'Customers', icon: <RiCustomerService2Fill />, route: 'customers' },
  { text: 'Vendors', icon: <GiSellCard />, route: 'vendors' },
  { text: 'Content', icon: <MdContentPasteGo />, route: 'content' },
  { text: 'Settings', icon: <AiOutlineSetting />, route: 'settings' },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface SideProps {
  onHandleClick: (text: string) => void;
}

export default function Sidebar(props: SideProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const autoHideTimer = React.useRef<NodeJS.Timeout | null>(null);
  const startAutoHideTimer = () => {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
    }
    autoHideTimer.current = setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const stopAutoHideTimer = () => {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
    }
  };

  const handleClick = (text: string, route: string) => {
    props.onHandleClick(text);
    navigate(route);
  };

  const handleToggleDrawer = () => {
    setOpen((prev) => {
      if (!prev) {
        startAutoHideTimer();
      }
      return !prev;
    });
  };

  React.useEffect(() => {
    return () => {
      stopAutoHideTimer();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant='permanent'
        open={open}
        PaperProps={{
          style: {
            position: 'relative',
            height: '100%',
          },
        }}
        onMouseEnter={stopAutoHideTimer}
        onMouseLeave={startAutoHideTimer}
      >
        <DrawerHeader>
          <MdArrowForwardIos
            className={styles.arrow}
            onClick={handleToggleDrawer}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </MdArrowForwardIos>
        </DrawerHeader>
        <Divider />
        <List className={styles.main_container}>
          {menuItems.map(({ text, icon, route }) => {
            // console.log(text);
            return (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => handleClick(text, route)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Divider />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
