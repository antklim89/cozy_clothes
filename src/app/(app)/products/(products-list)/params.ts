import { z } from 'zod/v4-mini';

const toArraySchema = z.pipe(
  z.string(),
  z.transform(v => z.array(z.coerce.number()).parseAsync(v.split(','))),
);

export const searchParamsSchema = z.object({
  page: z.catch(z.optional(z.coerce.number().check(z.minimum(0))), undefined),
  search: z.catch(z.optional(z.string()), undefined),
  categories: z.catch(z.optional(toArraySchema), undefined),
  countries: z.catch(z.optional(toArraySchema), undefined),
  colors: z.catch(z.optional(toArraySchema), undefined),
  sizes: z.catch(z.optional(toArraySchema), undefined),
  minPrice: z.catch(z.optional(z.coerce.number().check(z.minimum(0))), undefined),
  maxPrice: z.catch(z.optional(z.coerce.number().check(z.minimum(0))), undefined),
  sort: z.catch(z.optional(z.string()), undefined),
});
