import { Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Vendors from './pages/Vendors';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/Content_Management';

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/content" element={<ContentManagement />} />
      <Route element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
