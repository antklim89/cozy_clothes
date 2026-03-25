import type { CollectionConfig } from 'payload';

import { orderFormConfig } from '../config/form-config';

export const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
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
          name: 'qty',
          type: 'number',
          min: 1,
          required: true,
        },
      ],
    },
  ],
};
