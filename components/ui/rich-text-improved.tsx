import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { z } from 'zod';
import type { ColumnsBlock } from '@/payload-types';


const MediaSchema = z.object({
  url: z.string().default('/placeholder.jpg'),
  height: z.number().default(100),
  width: z.number().default(100),
  alt: z.string().optional(),
});


type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<ColumnsBlock>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    ColumnsBlock: ({ node }) => {
      return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-4">
          {node.fields.columns.map(({ column, id }) => (
            <RichText data={column} key={id} />
          ))}
        </div>
      );
    },
  },
  upload: ({ node }) => {
    const { success, data } = MediaSchema.safeParse(node.value);
    if (!success) return null;

    return (
      <Image
        alt={data.alt ?? data.url}
        height={data.height}
        src={data.url}
        width={data.width}
      />
    );
  },
});

export async function RichTextImproved({ ...props }: ComponentProps<typeof RichText>) {
  return (
    <RichText converters={jsxConverters} {...props} />
  );
}
