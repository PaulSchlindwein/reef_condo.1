import { MapPin, DollarSign, ExternalLink, Heart } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { HighlightChips } from './HighlightChips';
import { PriceDisplay } from './PriceDisplay';

interface RestaurantCardProps {
  restaurant: {
    name: string;
    type: string;
    description: string;
    status: string;
    priceRange: string;
    location: string;
    distance?: string;
    highlights?: string[];
    link?: string;
    localFavorite?: boolean;
  };
  showDistance?: boolean;
}

export function RestaurantCard({ restaurant, showDistance = false }: RestaurantCardProps) {
  return (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-dark mb-1">{restaurant.name}</h3>
            <p className="text-ocean-blue font-medium">{restaurant.type}</p>
          </div>
          {restaurant.localFavorite && (
            <Heart className="h-5 w-5 text-red-500 fill-current" />
          )}
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
          <PriceDisplay priceRange={restaurant.priceRange} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-cool">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </span>
          <span className="font-medium">{restaurant.location}</span>
        </div>
        {showDistance && restaurant.distance && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-cool">Distance</span>
            <span className="font-medium">{restaurant.distance}</span>
          </div>
        )}
      </div>

      <div className="border-t border-sand-warm pt-4">
        {restaurant.highlights && restaurant.highlights.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-gray-dark mb-2">Highlights</h4>
            <HighlightChips highlights={restaurant.highlights} />
          </div>
        )}

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
  );
}
