'use server';

import { checkAuthentication } from '../services';

export function checkAuthenticationAction() {
  return checkAuthentication();
}
