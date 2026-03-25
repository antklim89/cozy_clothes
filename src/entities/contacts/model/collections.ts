import type { CollectionConfig } from 'payload';

import { revalidateContactsCache } from '../services/cache';

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  hooks: {
    afterChange: [revalidateContactsCache],
    afterDelete: [revalidateContactsCache],
  },

  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
    {
      label: 'E-mail',
      name: 'email',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
    {
      label: 'Phone number',
      name: 'phone',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 1000,
    },
  ],
};
