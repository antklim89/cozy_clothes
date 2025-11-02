import 'server-only';
import { cache } from 'react';

import { getSeoRepository } from './repositories/get-seo-repository';

export const getSeo = cache(() => {
  return getSeoRepository();
});
