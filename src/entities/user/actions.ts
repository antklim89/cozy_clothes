'use server';
import 'server-only';
import { cache } from 'react';
import { authenticateRepository } from './repositories';

export const authenticateAction = cache(async () => {
  return authenticateRepository();
});
