import { z } from 'zod/v4';


export const PayloadOptionsSchema = z.object({
  sort: z.string().optional(),
  pagination: z.boolean().optional(),
  limit: z.number().positive().optional(),
  page: z.number().min(1).optional(),
});
