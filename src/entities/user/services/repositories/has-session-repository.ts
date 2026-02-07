import { cookies as getCookies } from 'next/headers';

export async function hasSessionRepository() {
  const cookies = await getCookies();
  const token = cookies.get('payload-token');
  return token != null;
}
