import 'server-only';
import config from '@payload-config';
import { logout as payloadLogout } from '@payloadcms/next/auth';

export async function logoutRepository() {
  await payloadLogout({ config });
}
