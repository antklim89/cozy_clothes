import 'server-only';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';


export async function getAboutRepository() {
  try {
    const payload = await getPayload();
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
