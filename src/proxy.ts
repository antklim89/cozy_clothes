import { type NextRequest, NextResponse } from 'next/server';

import { hasSession } from './entities/user/services';

export default async function proxy(req: NextRequest) {
  if (await hasSession()) return NextResponse.next();

  return NextResponse.redirect(new URL('/', req.nextUrl));
}

export const config = {
  matcher: ['/(user.*)', '/favorites'],
};
