import fs from 'node:fs';
import path from 'node:path';
import { decapCmsConfig } from '@/cms';

const decapCmsSrc = path.resolve('./node_modules/decap-cms/dist/decap-cms.js');
const decapCmsJs = await fs.promises.readFile(decapCmsSrc, 'utf8');

export function GET() {
  return new Response(
    `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script>window.CMS_MANUAL_INIT = true;</script>
  <script>${decapCmsJs}</script>
  <script>window.initCMS({ config: ${JSON.stringify(decapCmsConfig, null, 4)} });</script>
</body>
</html>
`,
    { headers: { 'content-type': 'text/html' } },
  );
}

export const dynamic = 'force-static';
