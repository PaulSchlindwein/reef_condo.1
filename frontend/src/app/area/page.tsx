import Image from 'next/image';
import { nassauAttractions, paradiseIslandAttractions, localRestaurants, transportation } from '../../../data/areaData';
import { MapPin, Clock, DollarSign, ExternalLink, Star, Car } from 'lucide-react';

export const metadata = {
  title: 'Nassau & Paradise Island Guide | Reef Condo',
  description: 'Discover the best attractions, restaurants, and activities in Nassau and Paradise Island during your stay at Reef Condo.',
};

function getPriceDisplay(priceRange: string) {
  const ranges = {
    '$': '$',
    '$$': '$$',
    '$$$': '$$$',
    'free': 'Free'
  };
  return ranges[priceRange as keyof typeof ranges] || priceRange;
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-success-green text-white',
    closed: 'bg-red-500 text-white',
    seasonal: 'bg-yellow-500 text-white'
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles] || styles.active}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AreaPage() {
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
            <h1 className="hero-title mb-4">Explore Nassau & Paradise Island</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Discover vibrant culture, pristine beaches, and unforgettable adventures beyond the resort
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Nassau Attractions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Nassau Attractions</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              Immerse yourself in Bahamian culture, history, and natural beauty in the vibrant capital city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {nassauAttractions.map((attraction, index) => (
              <div key={index} className="card p-6 hover:shadow-medium transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-1">{attraction.name}</h3>
                    <p className="text-ocean-blue font-medium">{attraction.type}</p>
                  </div>
                  <StatusBadge status={attraction.status} />
                </div>

                <p className="text-gray-cool mb-4 line-clamp-3">{attraction.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price
                    </span>
                    <span className="font-medium">{getPriceDisplay(attraction.priceRange)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <Car className="h-4 w-4 mr-1" />
                      Distance
                    </span>
                    <span className="font-medium">{attraction.distance}</span>
                  </div>
                </div>

                <div className="border-t border-sand-warm pt-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-dark mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-1">
                      {attraction.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-sand-light text-xs rounded-full text-gray-cool">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              Experience authentic Bahamian cuisine at these beloved local establishments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localRestaurants.map((restaurant, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-1">{restaurant.name}</h3>
                    <p className="text-ocean-blue font-medium">{restaurant.type}</p>
                    {restaurant.localFavorite && (
                      <span className="inline-flex items-center mt-1 text-coral-accent text-sm">
                        <Star className="h-4 w-4 mr-1" />
                        Local Favorite
                      </span>
                    )}
                  </div>
                  <StatusBadge status={restaurant.status} />
                </div>

                <p className="text-gray-cool mb-4">{restaurant.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price Range
                    </span>
                    <span className="font-medium">{getPriceDisplay(restaurant.priceRange)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <Car className="h-4 w-4 mr-1" />
                      Distance
                    </span>
                    <span className="font-medium">{restaurant.distance}</span>
                  </div>
                </div>

                <div className="border-t border-sand-warm pt-4">
                  <h4 className="font-medium text-gray-dark mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-sand-light text-xs rounded-full text-gray-cool">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transportation */}
        <section>
          <div className="text-center mb-12">
            <h2 className="section-title">Getting Around</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              Choose the best transportation option for your Nassau and Paradise Island adventures.
            </p>
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
                    {transport.highlights.map((highlight, idx) => (
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