import type { CollectionConfig } from 'payload';

import { orderFormConfig } from '../config/form-config';

export const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'status',
      type: 'select',
      options: ['waiting_for_payment', 'gathering', 'in_the_way', 'delivered', 'canceled'],
      required: true,
      defaultValue: 'waiting_for_payment',
    },
    {
      name: 'firstName',
      type: 'text',
      admin: { readOnly: true },
      ...orderFormConfig.firstName,
    },
    {
      name: 'lastName',
      type: 'text',
      admin: { readOnly: true },
      ...orderFormConfig.lastName,
    },
    {
      name: 'address',
      type: 'text',
      admin: { readOnly: true },
      ...orderFormConfig.address,
    },
    {
      name: 'phone',
      type: 'text',
      admin: { readOnly: true },
      ...orderFormConfig.phone,
    },
    {
      name: 'comments',
      type: 'text',
      admin: { readOnly: true },
      ...orderFormConfig.comments,
    },
    {
      label: 'User',
      name: 'user',
      type: 'relationship',
      required: true,
      relationTo: 'users',
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'productId',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          minLength: 5,
          maxLength: 1000,
          required: true,
        },
        {
          label: 'Price',
          name: 'price',
          type: 'number',
          min: 0,
          required: true,
        },
        {
          name: 'size',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          type: 'text',
          required: true,
        },
        {
          name: 'imageUrl',
          label: 'Image',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'qty',
          type: 'number',
          min: 1,
          required: true,
        },
      ],
    },
  ],
};
