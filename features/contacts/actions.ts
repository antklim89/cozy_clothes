'use server';
import { cache } from 'react';
import { getContacts } from '@/features/contacts/services';
import type { ContactType } from '@/features/contacts/types';
import type { PromiseResult } from '@/lib/result';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';


export const fetchContacts = cache(async (): PromiseResult<ContactType[]> => {
  try {
    const result = await getContacts();

    return success(result.docs);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
