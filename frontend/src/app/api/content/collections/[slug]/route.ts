import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';

async function getCollectionId(supa: any, slug: string) {
  const { data } = await supa.from('collections').select('id').eq('slug', slug).maybeSingle();
  return data?.id as string | undefined;
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const supa = getServerSupabase();
  const params = await ctx.params;
  if (!supa) return NextResponse.json({ items: [] });
  
  const colId = await getCollectionId(supa, params.slug);
  if (!colId) return NextResponse.json({ items: [] });
  
  const { data, error } = await supa
    .from('collection_items')
    .select('id, position, data')
    .eq('collection_id', colId)
    .order('position');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ items: data });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const authed = await isAdminRequest();
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  
  const params = await ctx.params;
  const colId = await getCollectionId(supa, params.slug);
  if (!colId) return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  
  const body = await req.json();
  const { data, error } = await supa.from('collection_items').insert({ 
    collection_id: colId, 
    data: body, 
    position: Math.floor(Date.now() / 1000) 
  }).select('id');
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data?.[0]?.id });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const authed = await isAdminRequest();
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  
  try {
    const { id, update, reorder } = await req.json();
    
    if (Array.isArray(reorder)) {
      // Reorder: array of item ids in desired order
      const updates = reorder.map((itemId: string, index: number) => ({ id: itemId, position: index }));
      const { error } = await supa.from('collection_items').upsert(updates);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    
    const { error } = await supa.from('collection_items').update({ data: update }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const authed = await isAdminRequest();
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supa.from('collection_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


