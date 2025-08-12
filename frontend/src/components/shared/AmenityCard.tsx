import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface AmenityCardProps {
  amenity: {
    name: string;
    description: string;
    location: string;
    hours: string;
    status: string;
    link?: string;
  };
}

export function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <div className="card p-6">
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
  );
}
