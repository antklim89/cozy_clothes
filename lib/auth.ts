import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


export function addAuthenticatedCookie(cookies: ReadonlyRequestCookies) {
  cookies.set('isAuthenticated', 'true');
}

export function removeAuthenticatedCookie(cookies: ReadonlyRequestCookies) {
  cookies.set('isAuthenticated', 'false');
}

export function checkIsAuthenticatedCookie() {
  const isAuthenticated = document.cookie.includes('isAuthenticated=true');
  return isAuthenticated;
}
