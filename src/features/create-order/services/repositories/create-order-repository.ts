import { ValidationError } from 'payload';
import 'server-only';

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
      where: {
        user: { equals: user.id },
      },
      req: { transactionID },
    });

    await payload.create({
      collection: 'orders',
      data: {
        address: input.address,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        comments: input.comments,
        user: user.id,
        cart: cart.docs.map(cartItem => ({ productId: cartItem.product, qty: cartItem.qty })),
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
