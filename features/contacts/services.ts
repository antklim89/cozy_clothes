import { getPayload } from 'payload';
import type { PaginatedDocs } from 'payload';
import type { ContactType } from '@/features/contacts/types';
import config from '@/payload.config';


export async function getContacts(): Promise<PaginatedDocs<ContactType>> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'contacts',
    pagination: false,
  });

  return result;
}
