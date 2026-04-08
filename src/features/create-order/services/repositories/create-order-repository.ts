import { ValidationError } from 'payload';
import 'server-only';

import { cartDto } from '@/entities/cart/model';
import type { UserType } from '@/entities/user/model';
import { getPayload } from '@/shared/lib/payload';
import type { PromiseResult } from '@/shared/lib/result';
import { errUnexpected, errValidation, ok } from '@/shared/lib/result';
import type { CreateOrderType } from '../../models/types';

export async function createOrderRepository({
  input,
  user,
}: {
  input: CreateOrderType;
  user: UserType;
}): PromiseResult<null, 'unexpected' | 'validation'> {
  const payload = await getPayload();
  const transactionID = await payload.db.beginTransaction();

  if (!transactionID) {
    console.error('Failed to create transaction.');
    return errUnexpected();
  }

  try {
    const cart = await payload.find({
      collection: 'cart',
      pagination: false,
      limit: undefined,
      depth: 3,
      where: {
        user: { equals: user.id },
      },
      req: { transactionID },
    });

    await payload.create({
      collection: 'orders',
      data: {
        status: 'waiting_for_payment',
        address: input.address,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        comments: input.comments,
        user: user.id,
        cart: cart.docs.map(cartDto).map(cartItem => ({
          productId: cartItem.product.id,
          qty: cartItem.qty,
          category: cartItem.product.category.name,
          country: cartItem.product.country.name,
          color: cartItem.product.color.name,
          size: cartItem.product.size.name,
          imageUrl: cartItem.product.imagePreview.url,
          price: cartItem.product.price,
          title: cartItem.product.title,
        })),
      },
      req: { transactionID },
    });

    await payload.delete({
      collection: 'cart',
      where: {
        user: { equals: user.id },
      },
      req: { transactionID },
    });

    await payload.db.commitTransaction(transactionID);
    return ok(null);
  } catch (error) {
    await payload.db.rollbackTransaction(transactionID);
    if (error instanceof ValidationError) {
      return errValidation(error.message, { issues: error.data.errors });
    }
    console.error(error);
    return errUnexpected('Failed to create create order');
  }
}
