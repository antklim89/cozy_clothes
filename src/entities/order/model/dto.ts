import type { Order } from '@/shared/model/types/payload-types.generated';
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
      product: {
        baseTitle: i.product.baseTitle,
        color: i.product.color,
        discount: i.product.discount,
        id: i.product.id,
        imageUrl: i.product.imageUrl,
        price: i.product.price,
        size: i.product.size,
        title: i.product.title,
      },
      qty: i.qty,
    })),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
}
