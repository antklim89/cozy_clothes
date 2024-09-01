import type { CmsCollectionFile } from 'decap-cms-core';


export const info: CmsCollectionFile = {
  label: 'Info',
  name: 'info',
  file: 'public/content/info.json',
  media_folder: '{{media_folder}}/info',
  public_folder: '{{public_folder}}/info',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      required: true,
    },
    {
      label: 'Description',
      name: 'description',
      widget: 'text',
      required: true,
    },
    {
      label: 'Keywords',
      name: 'keywords',
      widget: 'list',
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
      label: 'Creator',
      name: 'creator',
      widget: 'string',
      required: true,
    },
  ],
};
