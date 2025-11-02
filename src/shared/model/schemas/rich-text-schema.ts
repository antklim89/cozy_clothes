import { z } from 'zod/v4';

export const RichTextSchema = z
  .object({
    root: z.object({
      type: z.string(),
      children: z.array(
        z
          .object({
            type: z.string(),
            version: z.number(),
          })
          .catchall(z.unknown()),
      ),
      direction: z.union([z.literal('ltr'), z.literal('rtl'), z.null()]),
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
  })
  .catchall(z.unknown());
