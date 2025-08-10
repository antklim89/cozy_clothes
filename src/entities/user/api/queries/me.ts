import type { User } from '@/shared/model/payload-types.generated';
import { Users } from '../../model';


export async function meQuery() {
  const response = await fetch(`/api/${Users.slug}/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) return null;
  const { user } = await response.json() as { user: User | null };
  return user;
}
