import type { User } from '@/shared/model/types/payload-types.generated';
import { Users } from '../../model';

export async function meFetch() {
  const response = await fetch(`/api/${Users.slug}/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) return null;
  const { user } = (await response.json()) as { user: User | null };
  return user;
}
