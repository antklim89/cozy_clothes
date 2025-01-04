import { GITHUB_OAUTH_ID, GITHUB_OAUTH_SECRET } from './env';


export class GitHubOAuthClient {
  private id: string = GITHUB_OAUTH_ID;
  private secret: string = GITHUB_OAUTH_SECRET;
  private target = {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  } as const;


  authorizeURL(options: { redirect_uri: string; scope: string; state: string }) {
    const { id, target } = this;
    const { tokenHost, authorizePath } = target;
    const { redirect_uri, scope, state } = options;

    return `${tokenHost}${authorizePath}?response_type=code&client_id=${id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
  }

  async getToken(options: { code: string; redirect_uri: string }) {
    const { id, target, secret } = this;
    const { tokenHost, tokenPath } = target;
    const { redirect_uri, code } = options;

    const response = await fetch(`${tokenHost}${tokenPath}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: id,
        client_secret: secret,
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      }),
    });

    const json = (await response.json()) as { access_token: string };
    return json.access_token;
  }
}
