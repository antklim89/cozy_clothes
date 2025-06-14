import { randomUUID } from 'node:crypto';
import type { CollectionConfig } from 'payload';
import sharp from 'sharp';


export const MediaCollection = {
  slug: 'media',
  hooks: {
    beforeValidate: [
      async ({ req, operation, data }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const buffer = await sharp(req.file.data).resize({ width: 24 }).webp({ quality: 20 }).toBuffer();
          const blurDataUrl = `data:image/webp;base64,${buffer.toString('base64')}`;
          return { ...data, blurDataUrl };
        }
      },
    ],
    beforeOperation: [
      async ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          req.file.name = `${randomUUID()}-${req.file.name}`;
        }
      },
    ],
  },
  access: {
    read: () => true,
  },
  defaultPopulate: {
    filename: true,
    url: true,
    width: true,
    height: true,
    blurDataUrl: true,
  },
  fields: [
    {
      type: 'text',
      name: 'blurDataUrl',
      required: true,
      defaultValue: 'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk4vpvDAACgQFIuAF96wAAAABJRU5ErkJggg==',
      admin: {
        readOnly: true,
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
    {
      type: 'text',
      name: 'url',
      required: true,
      defaultValue: '/placeholder.jpg',
    },
    {
      type: 'number',
      name: 'width',
      required: true,
      defaultValue: 100,
    },
    {
      type: 'number',
      name: 'height',
      required: true,
      defaultValue: 100,
    },
  ],
  upload: {
    staticDir: 'media',
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },
    mimeTypes: ['image/*'],
  },
} as const satisfies CollectionConfig;
