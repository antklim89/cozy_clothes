import { z } from 'zod/v4-mini';

export const PayloadOptionsSchema = z.object({
  sort: z.optional(z.string()),
  pagination: z.optional(z.boolean()),
  limit: z.optional(z.number().check(z.minimum(0))),
  page: z.optional(z.number().check(z.minimum(1))),
});
