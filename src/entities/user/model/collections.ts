import type { CollectionConfig } from 'payload';

export const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      maxLength: 1000,
      required: false,
      defaultValue: '',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      maxLength: 1000,
      required: false,
      defaultValue: '',
    },
    {
      name: 'address',
      type: 'text',
      maxLength: 5000,
      required: false,
      defaultValue: '',
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 1000,
      required: false,
      defaultValue: '',
    },
  ],
} as const satisfies CollectionConfig;
