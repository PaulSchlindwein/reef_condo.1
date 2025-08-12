import { MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { HighlightChips } from './HighlightChips';
import { PriceDisplay } from './PriceDisplay';

interface AttractionCardProps {
  attraction: {
    name: string;
    type: string;
    description: string;
    status: string;
    priceRange: string;
    location: string;
    distance?: string;
    highlights?: string[];
    transportOptions?: string[];
    link?: string;
  };
  showDistance?: boolean;
}

export function AttractionCard({ attraction, showDistance = false }: AttractionCardProps) {
  return (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
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
          <PriceDisplay priceRange={attraction.priceRange} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-cool">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </span>
          <span className="font-medium">{attraction.location}</span>
        </div>
        {showDistance && attraction.distance && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-cool">Distance</span>
            <span className="font-medium">{attraction.distance}</span>
          </div>
        )}
      </div>

      <div className="border-t border-sand-warm pt-4">
        {attraction.highlights && attraction.highlights.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-gray-dark mb-2">Highlights</h4>
            <HighlightChips highlights={attraction.highlights} />
          </div>
        )}

        {attraction.transportOptions && attraction.transportOptions.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-gray-dark mb-2">Transportation</h4>
            <HighlightChips highlights={attraction.transportOptions} />
          </div>
        )}

        {attraction.link && (
          <a
            href={attraction.link}
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
