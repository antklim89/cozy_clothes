import { getPayload as getPayloadOriginal } from 'payload';
import config from '@payload-config';

export async function getPayload() {
  return getPayloadOriginal({ config });
}
