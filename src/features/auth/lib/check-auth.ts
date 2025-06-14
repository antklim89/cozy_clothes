import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { UserSchema, type UserType } from '@/src/entities/user/model';


const COOKIE_KEY = 'authenticated-user';

export function addUserCookie(cookies: ReadonlyRequestCookies, user: UserType) {
  cookies.set(COOKIE_KEY, JSON.stringify(user));
}

export function removeUserCookie(cookies: ReadonlyRequestCookies, user: UserType) {
  cookies.set(COOKIE_KEY, JSON.stringify(user));
}

export function getUserCookie(cookies?: ReadonlyRequestCookies): UserType | null {
  const userString = cookies
    ? cookies.get(COOKIE_KEY)?.value
    : document.cookie.split('; ').find(row => row.startsWith(`${COOKIE_KEY}=`))?.split('=')[1];

  if (userString == null) return null;

  const { success, data: user } = UserSchema.safeParse(JSON.parse(userString));
  if (!success) return null;

  return user;
}
