import type { CollectionConfig } from 'payload';


export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
};
