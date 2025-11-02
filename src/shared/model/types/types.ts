import type { z } from 'zod/v4-mini';

import type { MediaSchema } from '../schemas/media-schema';
import type { PayloadOptionsSchema } from '../schemas/payload-options-schema';
import type { RichTextSchema } from '../schemas/rich-text-schema';

export type RichText = z.infer<typeof RichTextSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type PayloadOptions = z.input<typeof PayloadOptionsSchema>;

export interface PaginatedData<T> {
  docs: T[];
  page: number;
  totalPages: number;
}
