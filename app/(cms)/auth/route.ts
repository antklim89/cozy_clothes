import { randomBytes } from 'node:crypto';
import { SITE_URL } from '@/lib/env';
import { GitHubOAuthClient } from '@/lib/github-oauth';


export async function GET() {
  const oauth2 = new GitHubOAuthClient();
  const authorizationUri = oauth2.authorizeURL({
    redirect_uri: `${SITE_URL}/callback?provider=github`,
    scope: 'public_repo,user',
    state: randomBytes(4).toString('hex'),
  });

  return new Response(null, { headers: { location: authorizationUri }, status: 301 });
}
