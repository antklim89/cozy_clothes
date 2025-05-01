import '@/lib/server-only';
import { getPayload } from 'payload';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getCountries({ name }: { name?: string } = {}) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'product-countries',
      pagination: false,
      limit: 10000,
      where: {
        name: name != null ? { contains: name } : {},
      },
    });

    return ok(result.docs);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch countries' });
  }
}
