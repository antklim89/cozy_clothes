'use server';
import { getPayload } from 'payload';
import type { AboutType } from '@/lib/types';
import config from '@/payload.config';


export async function fetchAbout(): Promise<AboutType> {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'About',
    depth: 1,
  });

  return result as AboutType;
}
