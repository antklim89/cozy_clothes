import { headers } from 'next/headers';
import { extractJWT } from 'payload';

import { getPayload } from '@/shared/lib/payload';
import type { Config } from '@/shared/model/types/payload-types.generated';

const usersCollectionName = 'users' satisfies keyof Config['collections'];

export async function hasSessionRepository(): Promise<boolean> {
  const payload = await getPayload();

  try {
    const token = extractJWT({ headers: await headers(), payload });
    if (!token) return false;
    const [, base64] = token.split('.');

    if (!base64) return false;
    const json = Buffer.from(base64, 'base64').toString('utf8');

    const data = JSON.parse(json) as { collection: string; exp: number };

    return data.collection === usersCollectionName && data.exp < Date.now();
  } catch {
    return false;
  }
}
