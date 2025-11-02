import config from '@payload-config';
import { getPayload as getPayloadOriginal } from 'payload';

export function getPayload() {
  return getPayloadOriginal({ config });
}
