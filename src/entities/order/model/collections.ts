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
      type: 'json',
      jsonSchema: {
        fileMatch: [],
        uri: 'https://example.com',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            required: ['product', 'qty'],
            properties: {
              product: {
                type: 'object',
                required: ['id', 'baseTitle', 'title', 'imageUrl', 'price', 'discount', 'size', 'color'],
                properties: {
                  id: { type: 'number' },
                  baseTitle: { type: 'string' },
                  title: { type: 'string' },
                  imageUrl: { type: 'string' },
                  price: { type: 'number' },
                  discount: { type: 'number' },
                  size: {
                    type: 'object',
                    required: ['name'],
                    properties: { name: { type: 'string' } },
                  },
                  color: {
                    type: 'object',
                    required: ['name', 'code'],
                    properties: {
                      name: { type: 'string' },
                      code: { type: 'string' },
                    },
                  },
                },
              },
              qty: {
                type: 'number',
                minimum: 0,
              },
            },
          },
        },
      },
      required: true,
    },
  ],
};
