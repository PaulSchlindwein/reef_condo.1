import { getBrowserSupabase } from './supabaseClient';

export type ContentKey = string; // e.g., 'info.hero.title'

// Server-side function for build-time content (fallback)
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

// Client-side function for real-time content
export async function getContentBlockClient(key: ContentKey, fallback: string): Promise<string> {
  try {
    const response = await fetch(`/api/content/blocks?key=${encodeURIComponent(key)}`, {
      cache: 'no-store' // Disable caching
    });
    if (!response.ok) return fallback;
    const data = await response.json();
    const block = data.data?.find((b: any) => b.id === key);
    return block?.value ?? fallback;
  } catch {
    return fallback;
  }
}

// Server-side function for build-time collections (fallback)
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

// Client-side function for real-time collections
export async function getCollectionItemsClient<T>(slug: string, fallback: T[]): Promise<T[]> {
  try {
    const response = await fetch(`/api/content/collections/${encodeURIComponent(slug)}`, {
      cache: 'no-store' // Disable caching
    });
    if (!response.ok) return fallback;
    const data = await response.json();
    return data.items?.map((item: any) => item.data as T) ?? fallback;
  } catch {
    return fallback;
  }
}


