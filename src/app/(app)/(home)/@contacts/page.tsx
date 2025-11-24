import { cacheTag } from 'next/cache';

import { CONTACTS_CACHE_TAG } from '@/entities/contacts/config';
import { getContacts } from '@/entities/contacts/services';
import { Contacts } from '@/entities/contacts/ui';

async function Page() {
  'use cache';
  cacheTag(CONTACTS_CACHE_TAG);

  const { type, result: contacts } = await getContacts();
  if (type === 'error') return <p>Error</p>;

  return <Contacts contacts={contacts} />;
}

export default Page;
