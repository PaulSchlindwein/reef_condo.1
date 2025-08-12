import { getBrowserSupabase } from '@/lib/supabaseClient';
import { z } from 'zod';

export async function getText(id: string, fallback: string): Promise<string> {
  const client = getBrowserSupabase();
  if (!client) return fallback;
  try {
    const { data } = await client.from('content_blocks').select('value').eq('id', id).maybeSingle();
    return (data?.value as string) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getList<T>(slug: string, schema: z.ZodType<T>, fallback: T[]): Promise<T[]> {
  const client = getBrowserSupabase();
  if (!client) return fallback;
  try {
    const { data: col } = await client.from('collections').select('id').eq('slug', slug).maybeSingle();
    if (!col?.id) return fallback;
    const { data } = await client
      .from('collection_items')
      .select('data, position')
      .eq('collection_id', col.id)
      .order('position');
    if (!data) return fallback;
    const parsed = data
      .map((r: { data: unknown }) => schema.safeParse(r.data))
      .filter((res: z.SafeParseReturnType<unknown, T>) => res.success)
      .map((res: z.SafeParseSuccess<T>) => res.data);
    return parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}


