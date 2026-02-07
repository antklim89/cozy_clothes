import { z } from 'zod/v4-mini';

import { phoneCheck } from '@/shared/model/schemas/checks';

export const UpdateUserSchema = z.object({
  firstName: z.optional(z.string().check(z.maxLength(1000))),
  lastName: z.optional(z.string().check(z.maxLength(1000))),
  address: z.optional(z.string().check(z.maxLength(1000))),
  phone: z.optional(z.string().check(z.maxLength(1000), phoneCheck)),
});
