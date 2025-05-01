import '@/lib/server-only';
import { getPayload } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getAbout() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'About',
      depth: 1,
    });

    return ok(result);
  } catch (error) {
    console.error('Error fetching about:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch about. Try again later.' });
  }
}
