import { randomUUID } from 'node:crypto';
import type { CollectionBeforeOperationHook, CollectionBeforeValidateHook, CollectionConfig } from 'payload';
import sharp from 'sharp';

import {
  PLACEHOLDER_BLUR_DATA,
  PLACEHOLDER_HEIGHT,
  PLACEHOLDER_MAX_HEIGHT,
  PLACEHOLDER_MAX_WIDTH,
  PLACEHOLDER_SRC,
  PLACEHOLDER_WIDTH,
} from '@/shared/config/image-placeholder';
import type { Media } from '../types/types';

const createBlurData: CollectionBeforeValidateHook<Media> = async ({ req, data }) => {
  try {
    if (!(req.file && data && data.width && data.height)) return;
    const { width, height } = data;
    const ratio = Math.min(24 / width, 24 / height);
    const newHeight = Math.round(height * ratio);
    const newWidth = Math.round(width * ratio);
    const buffer = await sharp(req.file.data)
      .resize({ width: newWidth, height: newHeight })
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataUrl = `data:image/webp;base64,${buffer.toString('base64')}`;

    return { ...data, blurDataUrl };
  } catch (error) {
    console.error(error);
  }
};

const renameUploadedFileToUuid: CollectionBeforeOperationHook = ({ req, operation }) => {
  if ((operation === 'create' || operation === 'update') && req.file) {
    req.file.name = randomUUID();
  }
};

export const MediaCollection = {
  slug: 'media',
  hooks: {
    beforeValidate: [createBlurData],
    beforeOperation: [renameUploadedFileToUuid],
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
      defaultValue: PLACEHOLDER_BLUR_DATA,
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
      defaultValue: PLACEHOLDER_SRC,
    },
    {
      type: 'number',
      name: 'width',
      required: true,
      defaultValue: PLACEHOLDER_WIDTH,
    },
    {
      type: 'number',
      name: 'height',
      required: true,
      defaultValue: PLACEHOLDER_HEIGHT,
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
    resizeOptions: {
      width: PLACEHOLDER_MAX_WIDTH,
      height: PLACEHOLDER_MAX_HEIGHT,
      fit: 'cover',
    },
    mimeTypes: ['image/*'],
  },
} as const satisfies CollectionConfig;
