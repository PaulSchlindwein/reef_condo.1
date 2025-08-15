import Image from 'next/image';

// Force dynamic rendering to ensure collection edits show immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { nassauAttractions as localNassauAttractions, localRestaurants as localLocalRestaurants, transportation as localTransportation } from '../../../data/areaData';
import { Clock } from 'lucide-react';
import { getPriceDisplay } from '@/components/shared/PriceDisplay';
import { getText, getList } from '@/content/client';
import { AttractionItemSchema, LocalRestaurantItemSchema, TransportationItemSchema } from '@/content/schema';
import { AttractionCard } from '@/components/shared/AttractionCard';
import { RestaurantCard } from '@/components/shared/RestaurantCard';

export const metadata = {
  title: 'Nassau & Paradise Island Guide | Reef Condo',
  description: 'Discover the best attractions, restaurants, and activities in Nassau and Paradise Island during your stay at Reef Condo.',
};



export default async function AreaPage() {
  const heroTitle = await getText('area.hero.title', 'Explore Nassau & Paradise Island');
  const heroSubtitle = await getText('area.hero.subtitle', 'Discover vibrant culture, pristine beaches, and unforgettable adventures beyond the resort');
  const nassauIntro = await getText('area.nassau.intro', 'Immerse yourself in Bahamian culture, history, and natural beauty in the vibrant capital city.');
  const localRestaurantsIntro = await getText('area.local.intro', 'Experience authentic Bahamian cuisine at these beloved local establishments.');
  const transportationIntro = await getText('area.transport.intro', 'Choose the best transportation option for your Nassau and Paradise Island adventures.');

  const nassauAttractions = await getList('area_nassau_attractions', AttractionItemSchema, localNassauAttractions);
  const localRestaurants = await getList('area_local_restaurants', LocalRestaurantItemSchema, localLocalRestaurants);
  const transportation = await getList('area_transportation', TransportationItemSchema, localTransportation);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="/images/area/downtown.jpg"
          alt="Beautiful downtown Nassau with colorful colonial architecture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="hero-title mb-4">{heroTitle}</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Nassau Attractions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Nassau Attractions</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{nassauIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {nassauAttractions.map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} showDistance={true} />
            ))}
          </div>

          {/* Featured Nassau Photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/area/parliament.jpg"
                alt="Parliament Square in Nassau"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/area/fort.jpg"
                alt="Historic Fort Charlotte"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/area/fish_fry.jpg"
                alt="Authentic Bahamian Fish Fry"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/area/junkanoo_beach.jpg"
                alt="Beautiful Junkanoo Beach"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Local Restaurants */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Local Favorites</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{localRestaurantsIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} showDistance={true} />
            ))}
          </div>
        </section>

        {/* Transportation */}
        <section>
          <div className="text-center mb-12">
            <h2 className="section-title">Getting Around</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{transportationIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transportation.map((transport, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-dark">{transport.type}</h3>
                  <span className="text-sm font-medium">{getPriceDisplay(transport.priceRange)}</span>
                </div>
                
                <p className="text-gray-cool mb-4">{transport.description}</p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-cool">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration
                    </span>
                    <span className="font-medium">{transport.duration}</span>
                  </div>
                </div>

                <div className="border-t border-sand-warm pt-4">
                  <h4 className="font-medium text-gray-dark mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    {(transport.highlights || []).map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-cool flex items-start">
                        <span className="text-success-green mr-2 mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 p-3 bg-sand-light rounded-lg">
                    <p className="text-sm text-gray-dark">
                      <strong>Booking:</strong> {transport.bookingInfo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}