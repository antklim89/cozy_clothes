import '@/lib/server-only';
import { getPayload } from 'payload';
import type { HeroType } from '@/features/hero/types';
import { err, ok } from '@/lib/result';
import config from '@/payload.config';


export async function getHero() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'Hero',
      depth: 1,
    });

    return ok(result as HeroType);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch hero. Try again later.' });
  }
}
