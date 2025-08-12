import { NextRequest, NextResponse } from 'next/server';
import { setAdminCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const password = typeof body?.password === 'string' ? body.password.trim() : '';
  let adminPassword = (process.env.ADMIN_PASSWORD ?? '').trim();
  if (!adminPassword && process.env.NODE_ENV !== 'production') {
    adminPassword = 'admin';
    console.warn('[admin] ADMIN_PASSWORD missing in .env.local. Using default "admin" in development.');
  }
  if (!adminPassword) {
    return NextResponse.json({ error: 'Server not configured: missing ADMIN_PASSWORD' }, { status: 500 });
  }
  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}


