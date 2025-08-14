'use client';

import { useState, useEffect } from 'react';
import { getContentBlockClient, getCollectionItemsClient, ContentKey } from '@/lib/content';

export function useContentBlock(key: ContentKey, fallback: string) {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    getContentBlockClient(key, fallback).then((value) => {
      if (mounted) {
        setContent(value);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [key, fallback]);

  return { content, loading };
}

export function useCollectionItems<T>(slug: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    getCollectionItemsClient<T>(slug, fallback).then((data) => {
      if (mounted) {
        setItems(data);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [slug, fallback]);

  return { items, loading };
}
