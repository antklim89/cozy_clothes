import { randomUUID } from 'node:crypto';
import type { CollectionConfig } from 'payload';


export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [{
    name: 'id',
    type: 'text',
    unique: true,
    required: true,
    access: {
      update: () => false,
      create: () => false,
    },
    defaultValue: () => randomUUID(),
    hidden: true,
  }],
};
