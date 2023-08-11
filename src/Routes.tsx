import { Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Vendors from './pages/Vendors';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/Content_Management';
import ProductEdit from './pages/Products/Edit';
import CustomerEdit from './pages/Customers/Edit';
import VendorEdit from './pages/Vendors/Edit';
import Utilities from './pages/Utilities';
import ReactHooksPage from './pages/React_Hooks_Page';
import UseMemo from './components/React_Hooks_Page/UseMemo';
import HooksListPAge from './components/React_Hooks_Page/HooksListPage';

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/edit/:id" element={<CustomerEdit />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/vendors/edit/:id" element={<VendorEdit />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/content" element={<ContentManagement />} />
      <Route path="/utilities" element={<Utilities />} />
      <Route path="/react-hooks-page" element={<ReactHooksPage />}>
        <Route path="" element={<HooksListPAge />} />
        <Route path="useState" element={<ReactHooksPage />} />
        <Route path="useEffect" element={<ReactHooksPage />} />
        <Route path="useContext" element={<ReactHooksPage />} />
        <Route path="useMemo" element={<UseMemo />} />
        <Route path="useCallback" element={<ReactHooksPage />} />
        <Route path="useRef" element={<ReactHooksPage />} />
      </Route>
      <Route element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
