import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';

async function getCollectionId(supa: any, slug: string) {
  const { data } = await supa.from('collections').select('id').eq('slug', slug).maybeSingle();
  return data?.id as string | undefined;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const supa = getServerSupabase();
  const params = await ctx.params;
  
  console.log('📥 API: GET request for collection:', params.slug);
  
  if (!supa) {
    console.log('❌ API: No Supabase client');
    return NextResponse.json({ items: [] });
  }
  
  const colId = await getCollectionId(supa, params.slug);
  if (!colId) {
    console.log('❌ API: Collection not found:', params.slug);
    return NextResponse.json({ items: [] });
  }
  
  console.log('🔍 API: Fetching items for collection ID:', colId);
  
  const { data, error } = await supa
    .from('collection_items')
    .select('id, position, data')
    .eq('collection_id', colId)
    .order('position');
    
  if (error) {
    console.error('❌ API: Fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  console.log('✅ API: Fetched items:', { count: data?.length || 0, items: data?.map(i => ({ id: i.id, name: i.data?.name })) });
  
  // Add timestamp to detect caching issues
  const timestamp = new Date().toISOString();
  console.log('🕐 API: Response timestamp:', timestamp);
  
  // Aggressive caching prevention
  const response = NextResponse.json({ 
    items: data, 
    timestamp,
    serverTime: Date.now(),
    nodeEnv: process.env.NODE_ENV
  });
  
  // Multiple cache-busting headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  response.headers.set('X-Timestamp', timestamp);
  
  return response;
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
    
    console.log('🔄 API: Updating item:', { id, update });
    
    const { data: beforeData, error: beforeError } = await supa
      .from('collection_items')
      .select('data')
      .eq('id', id)
      .single();
    
    if (beforeError) {
      console.error('❌ API: Error fetching before data:', beforeError);
      return NextResponse.json({ error: beforeError.message }, { status: 500 });
    }
    
    console.log('📋 API: Data before update:', beforeData?.data);
    
    const { error } = await supa.from('collection_items').update({ data: update }).eq('id', id);
    if (error) {
      console.error('❌ API: Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Verify the update worked
    const { data: afterData, error: afterError } = await supa
      .from('collection_items')
      .select('data')
      .eq('id', id)
      .single();
    
    if (afterError) {
      console.error('❌ API: Error fetching after data:', afterError);
    } else {
      console.log('📋 API: Data after update:', afterData?.data);
      console.log('✅ API: Update successful, data changed:', JSON.stringify(beforeData?.data) !== JSON.stringify(afterData?.data));
    }
    
    // Double-check: Fetch ALL items in this collection to see if our item is still there
    const params = await ctx.params;
    const collectionId = await getCollectionId(supa, params.slug);
    const { data: allItems, error: allItemsError } = await supa
      .from('collection_items')
      .select('id, data')
      .eq('collection_id', collectionId);
    
    if (!allItemsError) {
      console.log('🔍 API: All items in collection after update:', { 
        count: allItems?.length || 0, 
        items: allItems?.map(i => ({ id: i.id, name: i.data?.name })),
        updatedItemStillExists: allItems?.some(i => i.id === id)
      });
    } else {
      console.error('❌ API: Error fetching all items:', allItemsError);
    }
    
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


