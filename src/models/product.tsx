export interface Product {
  productName: string;
  productCategory: string;
  date: string;
  color: Color;
  price: number;
  amount: number;
  vendor: string;
  isStockAvailable: boolean;
  demandRating: number;
  id: number;
}

export type Color = 'red' | 'white' | 'pink' | 'blue' | 'yellow' | 'black';
