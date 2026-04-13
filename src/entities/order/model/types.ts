export interface OrderType {
  id: number;
  status: 'waiting_for_payment' | 'gathering' | 'in_the_way' | 'delivered' | 'canceled';
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  comments?: string | null;
  cart: {
    product: {
      id: number;
      baseTitle: string;
      title: string;
      imageUrl: string;
      price: number;
      discount: number;
      size: {
        name: string;
      };
      color: {
        name: string;
        code: string;
      };
    };
    qty: number;
    id?: number | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
