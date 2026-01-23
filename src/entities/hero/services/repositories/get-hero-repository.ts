import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import type { HeroType } from '../../model/types';

export async function getHeroRepository() {
  try {
    const payload = await getPayload();
    const result = await payload.findGlobal({
      slug: 'Hero',
      depth: 1,
    });

    return ok(result as HeroType);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return errUnexpected('Failed to fetch hero. Try again later.');
  }
}
