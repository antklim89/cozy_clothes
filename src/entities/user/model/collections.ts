import type { CollectionConfig } from 'payload';

export const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
} as const satisfies CollectionConfig;
