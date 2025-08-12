import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabaseClient';
import { isAdminRequest } from '@/lib/auth';

export const runtime = 'nodejs';

// Static data inline to avoid import issues
const seedData = {
  site_stats: [
    { icon: 'utensils', value: '20+', label: 'Restaurants' },
    { icon: 'activity', value: '15+', label: 'Activities' },
    { icon: 'map-pin', value: '5', label: 'Locations' },
    { icon: 'star', value: '24/7', label: 'Access' },
  ],
  resort_restaurants: [
    {
      name: 'Nobu',
      type: 'Japanese Fine Dining',
      description: 'World-renowned Japanese cuisine by celebrity chef Nobu Matsuhisa.',
      status: 'active',
      priceRange: '$$$$',
      location: 'Royal Towers',
      highlights: ['Celebrity Chef', 'Premium Sushi', 'Ocean Views'],
      link: ''
    },
    {
      name: 'Fish Fry',
      type: 'Bahamian Casual',
      description: 'Authentic Bahamian street food experience with fresh conch and fish.',
      status: 'active',
      priceRange: '$$',
      location: 'Marina Village',
      highlights: ['Local Cuisine', 'Fresh Seafood', 'Casual Atmosphere'],
      link: ''
    }
  ],
  resort_activities: [
    {
      name: 'Aquaventure Water Park',
      type: 'Water Park',
      description: 'Massive water park with slides, lazy river, and marine exhibits.',
      status: 'active',
      priceRange: 'included',
      location: 'Resort Wide',
      ageGroup: 'all',
      highlights: ['Water Slides', 'Lazy River', 'Marine Life'],
      link: ''
    },
    {
      name: 'Dolphin Cay',
      type: 'Marine Experience',
      description: 'Interactive dolphin experiences and marine habitat.',
      status: 'active',
      priceRange: '$$$',
      location: 'Dolphin Cay',
      ageGroup: 'all',
      highlights: ['Dolphin Interaction', 'Educational', 'Photo Opportunities'],
      link: ''
    }
  ],
  resort_amenities: [
    {
      name: 'Casino',
      description: 'Full-service casino with slots, table games, and poker room.',
      location: 'Royal Towers',
      hours: '24/7',
      status: 'active',
      link: ''
    },
    {
      name: 'Mandara Spa',
      description: 'Luxury spa offering massages, facials, and wellness treatments.',
      location: 'Beach Tower',
      hours: '9:00 AM - 9:00 PM',
      status: 'active',
      link: ''
    }
  ],
  area_nassau_attractions: [
    {
      name: 'Fort Charlotte',
      type: 'Historical Site',
      description: 'British colonial fort with dungeons, tunnels, and harbor views.',
      status: 'active',
      priceRange: 'free',
      location: 'Nassau',
      distance: '10 minutes',
      highlights: ['Historical', 'Harbor Views', 'Photo Opportunities'],
      transportOptions: ['Taxi', 'Walking', 'Bus'],
      link: ''
    },
    {
      name: 'Straw Market',
      type: 'Shopping',
      description: 'Traditional Bahamian market with handmade crafts and souvenirs.',
      status: 'active',
      priceRange: '$',
      location: 'Downtown Nassau',
      distance: '15 minutes',
      highlights: ['Local Crafts', 'Souvenirs', 'Cultural Experience'],
      transportOptions: ['Taxi', 'Walking'],
      link: ''
    }
  ],
  area_local_restaurants: [
    {
      name: 'Arawak Cay Fish Fry',
      type: 'Bahamian Seafood',
      description: 'Famous fish fry location with multiple vendors serving fresh conch and fish.',
      status: 'active',
      priceRange: '$$',
      location: 'Arawak Cay',
      distance: '20 minutes',
      highlights: ['Fresh Conch', 'Local Atmosphere', 'Multiple Vendors'],
      localFavorite: true,
      link: ''
    },
    {
      name: 'Graycliff Restaurant',
      type: 'Fine Dining',
      description: 'Historic mansion turned upscale restaurant with cigar factory.',
      status: 'active',
      priceRange: '$$$',
      location: 'Nassau',
      distance: '15 minutes',
      highlights: ['Historic Setting', 'Cigar Factory', 'Wine Cellar'],
      localFavorite: false,
      link: ''
    }
  ],
  area_transportation: [
    {
      type: 'Taxi',
      description: 'Convenient door-to-door service with licensed local drivers.',
      priceRange: '$$',
      duration: '15-30 minutes',
      highlights: ['Door-to-door', 'Air Conditioned', 'Local Drivers'],
      bookingInfo: 'Available at hotel taxi stand or call +1-242-323-5111'
    },
    {
      type: 'Bus',
      description: 'Public transportation system connecting major attractions.',
      priceRange: '$',
      duration: '30-45 minutes',
      highlights: ['Economical', 'Local Experience', 'Multiple Stops'],
      bookingInfo: 'Pay cash on board. Routes 10 and 15 serve Paradise Island.'
    }
  ]
};

async function ensureCollection(supa: any, slug: string, name: string) {
  const { data: existing } = await supa
    .from('collections')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: newCollection, error } = await supa
    .from('collections')
    .insert({ slug, name })
    .select('id')
    .single();

  if (error) throw error;
  return newCollection.id;
}

export async function POST(_req: NextRequest) {
  console.log('Seed collections API called');
  
  const authed = await isAdminRequest();
  console.log('Auth check result:', authed);
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supa = getServerSupabase();
  console.log('Supabase client:', !!supa);
  if (!supa) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });

  try {
    const collections = {
      site_stats: 'Site Statistics',
      resort_restaurants: 'Resort Restaurants',
      resort_activities: 'Resort Activities',
      resort_amenities: 'Resort Amenities',
      area_nassau_attractions: 'Nassau Attractions',
      area_local_restaurants: 'Local Restaurants',
      area_transportation: 'Transportation Options',
    };

    let totalSeeded = 0;

    for (const [slug, name] of Object.entries(collections)) {
      // Ensure collection exists
      const collectionId = await ensureCollection(supa, slug, name);
      
      // Check if already has items
      const { data: existingItems } = await supa
        .from('collection_items')
        .select('id')
        .eq('collection_id', collectionId)
        .limit(1);

      if (existingItems && existingItems.length > 0) {
        continue; // Skip if already has data
      }

      // Insert seed data
      const items = seedData[slug as keyof typeof seedData] || [];
      for (let i = 0; i < items.length; i++) {
        const { error } = await supa
          .from('collection_items')
          .insert({
            collection_id: collectionId,
            data: items[i],
            position: i
          });

        if (error) throw error;
        totalSeeded++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${totalSeeded} items across ${Object.keys(collections).length} collections` 
    });

  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ 
      error: 'Failed to seed collections', 
      details: error.message 
    }, { status: 500 });
  }
}
