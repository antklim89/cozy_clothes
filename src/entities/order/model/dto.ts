import type { Order, Product } from '@/shared/model/types/payload-types.generated';
import type { OrderType } from './types';

export function orderDto(data: Order): OrderType {
  return {
    id: data.id,
    status: data.status,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phone: data.phone,
    comments: data.comments,
    cart: data.cart.map(i => ({
      product: i.productId as Product,
      qty: i.qty,
      category: i.category,
      color: i.color,
      country: i.country,
      imageUrl: i.imageUrl,
      price: i.price,
      size: i.size,
      title: i.title,
    })),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
}
