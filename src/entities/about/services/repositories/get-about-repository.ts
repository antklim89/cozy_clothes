import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

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
    return errUnexpected('Failed to fetch about. Try again later.');
  }
}
