import { cache } from 'react';
import 'server-only';
import { z } from 'zod/v4-mini';

import { getMe } from '@/entities/user/services';
import { errUnauthenticated, errValidation } from '@/shared/lib/result';
import { createOrderRepository } from './repositories/create-order-repository';
import { CreateOrderSchema } from '../models/schemas';
import type { CreateOrderType } from '../models/types';

export const createOrder = cache(async ({ input }: { input: CreateOrderType }) => {
  const { success, data: validatedInput, error: validationError } = CreateOrderSchema.safeParse(input);
  if (!success) return errValidation(z.prettifyError(validationError));

  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await createOrderRepository({ input: validatedInput, user });

  return result;
});
