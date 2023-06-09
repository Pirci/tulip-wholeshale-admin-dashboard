export interface Orders {
  orderId: string;
  productName: string;
  customerName: string;
  orderDate: Date;
  quantity: number;
  orderStatus: Status;
}

export type Status =
  | 'Delivered'
  | 'Shipped'
  | 'Processing'
  | 'Cancelled'
  | 'Refund';
