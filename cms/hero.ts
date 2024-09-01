import type { CmsCollectionFile } from 'decap-cms-core';


export const hero: CmsCollectionFile = {
  label: 'Hero',
  name: 'hero',
  file: 'public/content/hero.json',
  media_folder: '{{media_folder}}/hero',
  public_folder: '{{public_folder}}/hero',
  fields: [
    {
      label: 'Text',
      name: 'text',
      widget: 'markdown',
      required: true,
    },
    {
      label: 'Image Preview',
      name: 'imagePreview',
      widget: 'image',
      required: true,
      allow_multiple: false,
    },
  ],
};
