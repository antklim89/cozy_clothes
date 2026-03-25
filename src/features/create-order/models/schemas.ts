import { z } from 'zod/v4-mini';

import { orderFormConfig } from '@/entities/order/config';
import { phoneCheck } from '@/shared/model/schemas/checks';

const { address, comments, firstName, lastName, phone } = orderFormConfig;

export const CreateOrderSchema = z.object({
  firstName: z.string().check(z.minLength(firstName.minLength), z.maxLength(firstName.maxLength)),
  lastName: z.string().check(z.minLength(lastName.minLength), z.maxLength(lastName.maxLength)),
  address: z.string().check(z.minLength(address.minLength), z.maxLength(address.maxLength)),
  phone: z.string().check(z.maxLength(phone.maxLength), phoneCheck),
  comments: z.optional(z.string().check(z.minLength(comments.minLength), z.maxLength(comments.maxLength))),
});
