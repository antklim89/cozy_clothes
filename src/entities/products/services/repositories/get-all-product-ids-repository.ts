import 'server-only';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';


export async function getAllProductIdsRepository() {
  try {
    const payload = await getPayload();

    const result = await payload.find({
      collection: 'products',
      limit: Number.MAX_SAFE_INTEGER,
      depth: 0,
      select: {
        // @ts-expect-error id exists
        id: true,
      },
    });

    const ids = result.docs.map(i => i.id);

    return ok(ids);
  } catch (error) {
    console.error('[Error getAllProductIdsService]:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product ids. Try again later.' });
  }
}
