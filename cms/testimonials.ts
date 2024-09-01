import type { CmsCollection } from 'decap-cms-core';


export const testimonials: CmsCollection = {
  name: 'testimonials',
  label: 'Testimonials',
  create: true,
  delete: true,
  format: 'json',
  folder: 'public/content/testimonials',
  media_folder: '{{media_folder}}/testimonials',
  public_folder: '{{public_folder}}/testimonials',
  identifier_field: 'name',
  slug: '{{year}}{{month}}{{day}}{{hour}}{{minute}}{{second}}-{{slug}}',
  fields: [
    {
      label: 'Hidden',
      name: 'hidden',
      widget: 'boolean',
      default: false,
      required: false,
    },
    {
      label: 'Author Image',
      name: 'image',
      widget: 'image',
      required: true,
      allow_multiple: false,
    },
    {
      label: 'Text',
      name: 'text',
      widget: 'text',
      required: true,
    },
    {
      label: 'Author Name',
      name: 'name',
      widget: 'string',
      required: true,
    },
  ],
};
