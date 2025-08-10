import 'server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/src/shared/lib/result';
import { getAboutRepository } from './repositories/get-about-repository';
import type { AboutType } from '../model/types';


export const getAbout = cache(async (): PromiseResult<AboutType> => {
  const result = await getAboutRepository();
  return result;
});
