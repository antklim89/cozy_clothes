import '@/lib/server-only';
import { cache } from 'react';
import { getContacts } from '@/features/contacts/services';
import { okMap } from '@/lib/result';


export const fetchContacts = cache(async () => {
  const result = await getContacts();

  return okMap(result, r => r.docs);
});
