import 'server-only';
import { logout as payloadLogout } from '@payloadcms/next/auth';
import config from '@/payload.config';

export async function logoutRepository() {
  await payloadLogout({ config });
}
