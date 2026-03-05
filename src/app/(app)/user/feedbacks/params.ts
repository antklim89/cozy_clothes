import { z } from 'zod/v4-mini';

export const SearchParamsSchema = z.object({
  page: z.catch(z.optional(z.coerce.number().check(z.positive())), undefined),
  sort: z.catch(z.optional(z.string()), undefined),
});
