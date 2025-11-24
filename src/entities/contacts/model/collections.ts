import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

import { CONTACTS_CACHE_TAG } from '../config/cache-tag';

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  hooks: {
    afterChange: [() => revalidateTag(CONTACTS_CACHE_TAG, 'max')],
    afterDelete: [() => revalidateTag(CONTACTS_CACHE_TAG, 'max')],
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
