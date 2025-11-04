import 'server-only';
import { cache } from 'react';

import { getMeRepository } from './repositories/get-me-repository';

export const getMe = cache(() => {
  return getMeRepository();
});
