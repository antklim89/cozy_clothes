import '@/lib/server-only';
import { cache } from 'react';
import { okMap } from '@/lib/result';
import { getContacts } from './services';


export const fetchContacts = cache(async () => {
  const result = await getContacts();

  return okMap(result, r => r.docs);
});
