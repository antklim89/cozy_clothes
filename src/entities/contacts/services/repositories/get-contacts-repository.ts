import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';

export async function getContactsRepository() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'contacts',
      pagination: false,
    });

    return ok(result.docs);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch contacts. Try again later.' });
  }
}
