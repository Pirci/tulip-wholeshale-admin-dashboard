export interface Vendors {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  product_availablity: 'high' | 'meidum' | 'low';
  products_sold: ProductSold[];
}

export interface ProductSold {
  id: string;
  name: string;
  price: string;
}
