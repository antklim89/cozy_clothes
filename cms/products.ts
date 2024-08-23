import type { CmsCollection } from 'decap-cms-core';

export const products: CmsCollection = {
  name: 'products',
  label: 'Products',
  create: true,
  delete: true,
  format: 'json',
  folder: 'public/content/products',
  media_folder: '{{media_folder}}/products',
  public_folder: '{{public_folder}}/products',
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
      label: 'Discount',
      name: 'discount',
      widget: 'number',
      min: 0,
      max: 100,
    },
    {
      label: 'Price',
      name: 'price',
      widget: 'number',
      value_type: 'float',
      min: 0,
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Created at',
      name: 'createdAt',
      widget: 'datetime',
    },
    {
      label: 'Image Preview',
      name: 'imagePreview',
      widget: 'image',
      required: true,
      allow_multiple: false,
    },
    {
      label: 'Category',
      name: 'category',
      widget: 'select',
      options: ['shirts', 'hats'],
    },
    {
      label: 'Description',
      name: 'description',
      widget: 'markdown',
    },
    {
      label: 'Images',
      name: 'images',
      widget: 'list',
      default: [],
      required: true,
      min: 1,
      field: {
        label: 'Image',
        name: 'image',
        widget: 'image',
        required: true,
      },
    },
    {
      label: 'Options',
      name: 'options',
      widget: 'object',
      fields: [
        {
          label: 'Sizes',
          name: 'sizes',
          widget: 'list',
          summary: '{{fields.size}}',
          field: {
            label: 'Size',
            name: 'size',
            widget: 'select',
            options: ['sx', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
          },
        },
        {
          label: 'Colors',
          name: 'colors',
          widget: 'list',
          fields: [
            {
              label: 'Name',
              name: 'name',
              widget: 'string',
              required: true,
            },
            {
              label: 'Code',
              name: 'code',
              widget: 'string',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
