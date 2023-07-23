import { Product } from "./product";

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  product_availablity: 'high' | 'meidum' | 'low';
  products_sold: Partial<Product[]>;
}
