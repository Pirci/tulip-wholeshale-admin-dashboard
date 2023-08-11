import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { GiSellCard } from 'react-icons/gi';
import {
  MdOutlineProductionQuantityLimits,
  MdContentPasteGo,
} from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import ConstructionIcon from '@mui/icons-material/Construction';

export const menuItems = [
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
  { text: 'Utilities', icon: <ConstructionIcon />, route: 'utilities' },
  { text: 'Settings', icon: <AiOutlineSetting />, route: 'settings' },
  {
    text: 'React Hooks Page',
    icon: <ConstructionIcon />,
    route: 'react-hooks-page',
  },
];
