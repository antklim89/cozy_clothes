import 'server-only';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import { seoDto } from '../../models/dto';


export async function getSeoRepository() {
  try {
    const payload = await getPayload();
    const payloadResult = await payload.findGlobal({
      slug: 'Seo',
    });

    const dto = seoDto(payloadResult);
    return ok(dto);
  } catch (error) {
    console.error('Error fetching seo:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch seo' });
  }
}
