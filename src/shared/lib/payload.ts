import config from '@payload-config';
import { getPayload as getPayloadOriginal } from 'payload';

export async function getPayload() {
  return getPayloadOriginal({ config });
}
