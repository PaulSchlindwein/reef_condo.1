import { getBrowserSupabase } from './supabaseClient';

export type ContentKey = string; // e.g., 'info.hero.title'

export async function getContentBlock(key: ContentKey, fallback: string): Promise<string> {
  const client = getBrowserSupabase();
  if (!client) return fallback;
  try {
    const { data, error } = await client
      .from('content_blocks')
      .select('value')
      .eq('id', key)
      .maybeSingle();
    if (error || !data) return fallback;
    return data.value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getCollectionItems<T>(slug: string, fallback: T[]): Promise<T[]> {
  const client = getBrowserSupabase();
  if (!client) return fallback;
  try {
    const { data: col, error: errC } = await client
      .from('collections')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (errC || !col) return fallback;
    const { data, error } = await client
      .from('collection_items')
      .select('data, position')
      .eq('collection_id', col.id)
      .order('position', { ascending: true });
    if (error || !data) return fallback;
    return data.map((row: any) => row.data as T);
  } catch {
    return fallback;
  }
}


