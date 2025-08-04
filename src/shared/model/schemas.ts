import { z } from 'zod/v4';


export const RichTextSchema = z.object({
  root: z.object({
    type: z.string(),
    children: z.array(
      z.object({
        type: z.string(),
        version: z.number(),
      }).catchall(z.unknown()),
    ),
    direction: z.union([
      z.literal('ltr'),
      z.literal('rtl'),
      z.null(),
    ]),
    format: z.union([
      z.literal('left'),
      z.literal('start'),
      z.literal('center'),
      z.literal('right'),
      z.literal('end'),
      z.literal('justify'),
      z.literal(''),
    ]),
    indent: z.number(),
    version: z.number(),
  }),
}).catchall(z.unknown());

export const MediaSchema = z.object({
  id: z.number(),
  blurDataUrl: z.string(),
  url: z.string(),
  filename: z.string().nullish(),
  width: z.number(),
  height: z.number(),
});

export const PayloadOptionsSchema = z.object({
  sort: z.string().optional(),
  pagination: z.boolean().optional(),
  limit: z.number().positive().optional(),
  page: z.number().min(1).optional(),
});
