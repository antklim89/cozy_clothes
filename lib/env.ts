import { z } from 'zod';


export const SITE_URL = z.string({ message: 'URL env is required' }).parse(process.env.URL);

export const NETLIFY = process.env.NETLIFY === 'true';
export const REPOSITORY_URL = NETLIFY ? '' : z.string({ message: 'REPOSITORY_URL env is required' }).parse(process.env.REPOSITORY_URL);
export const GITHUB_OAUTH_ID = NETLIFY ? '' : z.string({ message: 'GITHUB_OAUTH_ID env is required' }).parse(process.env.GITHUB_OAUTH_ID);
export const GITHUB_OAUTH_SECRET = NETLIFY ? '' : z.string({ message: 'GITHUB_OAUTH_SECRET env is required' }).parse(process.env.GITHUB_OAUTH_SECRET);
