import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical';
import type { z } from 'zod/v4-mini';

import type { MediaSchema } from '../schemas/media-schema';
import type { PayloadOptionsSchema } from '../schemas/payload-options-schema';

export type RichText = SerializedEditorState<SerializedLexicalNode>;
export type Media = z.infer<typeof MediaSchema>;
export type PayloadOptions = z.input<typeof PayloadOptionsSchema>;

export interface PaginatedData<T> {
  docs: T[];
  page: number;
  totalPages: number;
}
