import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';

// Import local fallback data to seed Supabase
import { restaurants as resortRestaurants, activities as resortActivities, amenities as resortAmenities } from '../../../../../../data/resortData';
import { nassauAttractions, localRestaurants as areaLocalRestaurants, transportation as areaTransportation } from '../../../../../../data/areaData';

async function getCollectionId(supa: any, slug: string) {
  const { data } = await supa.from('collections').select('id').eq('slug', slug).maybeSingle();
  return data?.id as string | undefined;
}

export async function POST(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const authed = await isAdminRequest();
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supa = getServerSupabase();
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });

  const { slug } = await ctx.params;
  const colId = await getCollectionId(supa, slug);
  if (!colId) return NextResponse.json({ error: 'Collection not found' }, { status: 404 });

  let rows: any[] = [];
  if (slug === 'resort_restaurants') rows = resortRestaurants.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'resort_activities') rows = resortActivities.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'resort_amenities') rows = resortAmenities.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'area_nassau_attractions') rows = nassauAttractions.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'area_local_restaurants') rows = areaLocalRestaurants.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'area_transportation') rows = areaTransportation.map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  else if (slug === 'site_stats') {
    rows = [
      { icon: 'utensils', value: `${resortRestaurants.length}+`, label: 'Restaurants' },
      { icon: 'activity', value: `${resortActivities.length}+`, label: 'Activities' },
      { icon: 'map-pin', value: '5', label: 'Locations' },
      { icon: 'star', value: '24/7', label: 'Access' },
    ].map((d) => ({ collection_id: colId, position: Date.now(), data: d }));
  }

  if (rows.length === 0) return NextResponse.json({ error: 'Nothing to seed for this slug' }, { status: 400 });

  const { error } = await supa.from('collection_items').insert(rows);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, count: rows.length });
}


