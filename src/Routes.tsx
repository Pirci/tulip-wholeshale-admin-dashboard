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
      <Route element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
