import type { CmsCollectionFile } from 'decap-cms-core';

export const about: CmsCollectionFile = {
  label: 'About',
  name: 'about',
  file: 'public/content/about.json',
  media_folder: '{{media_folder}}/about',
  public_folder: '{{public_folder}}/about',
  fields: [
    {
      label: 'Text',
      name: 'text',
      widget: 'markdown',
      required: true,
    },
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      required: true,
      allow_multiple: false,
    },
    {
      label: 'Values',
      name: 'values',
      widget: 'markdown',
      required: true,
    },
    {
      label: 'Values list',
      name: 'valuesList',
      widget: 'list',
      required: true,
      fields: [
        { name: 'title', widget: 'string', required: true },
        { name: 'text', widget: 'string', required: true },
      ],
    },
  ],
};
