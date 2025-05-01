import '@/lib/server-only';
import { getPayload } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getSeo() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'Seo',
    });

    return ok(result);
  } catch (error) {
    console.error('Error fetching seo:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch seo' });
  }
}
