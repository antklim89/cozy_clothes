import '@/lib/server-only';
import { getPayload } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getContacts() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'contacts',
      pagination: false,
    });

    return ok(result);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch contacts. Try again later.' });
  }
}
