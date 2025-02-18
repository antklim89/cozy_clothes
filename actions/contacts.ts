'use server';
import { getPayload } from 'payload';
import type { ContactType } from '@/lib/types';
import config from '@/payload.config';


export async function fetchContacts(): Promise<ContactType[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'contacts',
    pagination: false,
  });

  return result.docs;
}
