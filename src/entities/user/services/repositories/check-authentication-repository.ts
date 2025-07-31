import 'server-only';
import { headers } from 'next/headers';
import { getPayload } from '@/src/shared/lib/payload';
import { Users } from '../../model/collections';
import type { UserType } from '../../model/types';


export async function checkAuthenticationRepository(): Promise<UserType | null> {
  try {
    const payload = await getPayload();
    const result = await payload.auth({ headers: await headers() });

    if (result.user == null) return null;
    if (result.user.collection !== Users.slug) return null;

    return {
      id: result.user.id,
      email: result.user.email,
    };
  } catch {
    return null;
  }
}
