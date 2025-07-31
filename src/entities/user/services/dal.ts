import 'server-only';
import { cache } from 'react';
import { checkAuthenticationRepository } from './repositories/check-authentication-repository';

export const checkAuthentication = cache(async () => {
  return checkAuthenticationRepository();
});
