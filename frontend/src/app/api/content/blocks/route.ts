import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || undefined;
  const key = url.searchParams.get('key') || undefined;
  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ data: [] });
  
  let query = supa.from('content_blocks').select('id, value');
  
  if (key) {
    // Single key query
    query = query.eq('id', key);
  } else if (page) {
    // Page prefix query
    query = query.ilike('id', `${page}.%`);
  }
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Disable caching
  const response = NextResponse.json({ data });
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}

export async function PUT(req: NextRequest) {
  const authed = await isAdminRequest();
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  const { blocks } = await req.json();
  if (!Array.isArray(blocks)) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const upserts = blocks.map((b: any) => ({ id: b.id, value: b.value }));
  const { error } = await supa.from('content_blocks').upsert(upserts, { onConflict: 'id' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


