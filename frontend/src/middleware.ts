import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();
  const token = req.cookies.get('admin_session')?.value;
  if (!token) {
    // allow reaching the admin page; the page will show login UI
    return NextResponse.next();
  }
  return NextResponse.next();
}


