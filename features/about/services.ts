import { getPayload } from 'payload';
import config from '@/payload.config';


export async function getAbout() {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'About',
    depth: 1,
  });

  return result;
}
