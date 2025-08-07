import Image from 'next/image';
import { restaurants, activities, amenities } from '../../../data/resortData';
import { Utensils, Activity, MapPin, Clock, DollarSign, ExternalLink, Star } from 'lucide-react';

export const metadata = {
  title: 'Atlantis Resort Guide | Reef Condo Paradise Island',
  description: 'Discover world-class dining, thrilling activities, and luxury amenities at the Atlantis Resort during your stay at Reef Condo.',
};

function getPriceDisplay(priceRange: string) {
  const ranges = {
    '$': '$',
    '$$': '$$',
    '$$$': '$$$',
    '$$$$': '$$$$',
    'included': 'Included'
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

export default function ResortPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="/images/resort/view_of_resort.jpg"
          alt="Stunning view of Atlantis Resort from your condo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="hero-title mb-4">Atlantis Resort Guide</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Discover world-class dining, thrilling adventures, and luxury amenities at your fingertips
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 card">
            <Utensils className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{restaurants.length}+</div>
            <div className="text-gray-cool">Restaurants</div>
          </div>
          <div className="text-center p-6 card">
            <Activity className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{activities.length}+</div>
            <div className="text-gray-cool">Activities</div>
          </div>
          <div className="text-center p-6 card">
            <MapPin className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">5</div>
            <div className="text-gray-cool">Locations</div>
          </div>
          <div className="text-center p-6 card">
            <Star className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">24/7</div>
            <div className="text-gray-cool">Access</div>
          </div>
        </div>

        {/* Dining Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">World-Class Dining</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              From celebrity chef restaurants to casual beachside dining, Atlantis offers culinary experiences for every taste and occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="card p-6 hover:shadow-medium transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-1">{restaurant.name}</h3>
                    <p className="text-ocean-blue font-medium">{restaurant.type}</p>
                  </div>
                  <StatusBadge status={restaurant.status} />
                </div>

                <p className="text-gray-cool mb-4 line-clamp-3">{restaurant.description}</p>

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
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </span>
                    <span className="font-medium">{restaurant.location}</span>
                  </div>
                </div>

                <div className="border-t border-sand-warm pt-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-dark mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-sand-light text-xs rounded-full text-gray-cool">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {restaurant.link && (
                    <a
                      href={restaurant.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-ocean-blue hover:text-ocean-light font-medium"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Adventures & Activities</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              From thrilling water slides to relaxing spa treatments, discover endless entertainment options for every age and interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="card p-6 hover:shadow-medium transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-1">{activity.name}</h3>
                    <p className="text-ocean-blue font-medium">{activity.type}</p>
                  </div>
                  <StatusBadge status={activity.status} />
                </div>

                <p className="text-gray-cool mb-4 line-clamp-3">{activity.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price
                    </span>
                    <span className="font-medium">{getPriceDisplay(activity.priceRange)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-cool">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </span>
                    <span className="font-medium">{activity.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-cool">Age Group</span>
                    <span className="font-medium capitalize">{activity.ageGroup}</span>
                  </div>
                </div>

                <div className="border-t border-sand-warm pt-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-dark mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-1">
                      {activity.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-sand-light text-xs rounded-full text-gray-cool">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-ocean-blue hover:text-ocean-light font-medium"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="section-title">Resort Amenities</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">
              Essential services and facilities to enhance your stay and ensure your comfort throughout your visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-dark">{amenity.name}</h3>
                  <StatusBadge status={amenity.status} />
                </div>
                
                <p className="text-gray-cool mb-4">{amenity.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-cool">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </span>
                    <span className="font-medium">{amenity.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-cool">
                      <Clock className="h-4 w-4 mr-1" />
                      Hours
                    </span>
                    <span className="font-medium">{amenity.hours}</span>
                  </div>
                </div>

                {amenity.link && (
                  <div className="mt-4 pt-4 border-t border-sand-warm">
                    <a
                      href={amenity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-ocean-blue hover:text-ocean-light font-medium"
                    >
                      <span>More Information</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}