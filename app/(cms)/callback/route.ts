import { SITE_URL } from '@/lib/env';
import { GitHubOAuthClient } from '@/lib/github-oauth';


export async function GET(request: Request) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  if (provider !== 'github') {
    return new Response('Invalid provider', { status: 400 });
  }

  const code = url.searchParams.get('code');
  if (code == null) {
    return new Response('Missing code', { status: 400 });
  }

  const oauth2 = new GitHubOAuthClient();
  const accessToken = await oauth2.getToken({
    code,
    redirect_uri: `${SITE_URL}/callback?provider=github`,
  });

  return new Response(
    `
<html>
<head>
  <script>
    const receiveMessage = (message) => {
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: accessToken })}',
        '*'
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  </script>
  <body>
    <p>Authorizing Decap...</p>
  </body>
</head>
</html>
`,
    { headers: { 'Content-Type': 'text/html' } },
  );
}
