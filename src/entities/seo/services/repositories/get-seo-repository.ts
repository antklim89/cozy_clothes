import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
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
    console.error(error);
    return errUnexpected('Failed to fetch seo');
  }
}
