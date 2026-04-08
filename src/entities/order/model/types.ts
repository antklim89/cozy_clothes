import type { Product } from '@/shared/model/types/payload-types.generated';

export interface OrderType {
  id: number;
  status: 'waiting_for_payment' | 'gathering' | 'in_the_way' | 'delivered' | 'canceled';
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  comments?: string | null;
  cart: {
    product: Product;
    qty: number;
    title: string;
    price: number;
    size: string;
    color: string;
    imageUrl: string;
    category: string;
    country: string;
  }[];
  updatedAt: string;
  createdAt: string;
}
