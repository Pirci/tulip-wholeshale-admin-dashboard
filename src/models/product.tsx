export interface Porduct {
  productName: string;
  productCategory: string;
  date: Date;
  color: Color;
  price: number;
  amount: number;
  vendor: string;
  isStockAvailable: boolean;
  demandRating: number;
}

export type Color = 'red' | 'white' | 'pink' | 'blue' | 'yellow';
