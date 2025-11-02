import 'server-only';
import { cache } from 'react';

import { getContactsRepository } from './repositories/get-contacts-repository';

export const getContacts = cache(async () => {
  const result = await getContactsRepository();
  return result;
});
