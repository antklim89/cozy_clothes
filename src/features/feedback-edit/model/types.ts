import type { z } from 'zod/v4-mini';

import type { CreateFeedbackInputSchema } from './schemas';

export type CreateFeedbackInputType = z.infer<typeof CreateFeedbackInputSchema>;
