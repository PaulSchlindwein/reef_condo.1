import Image from 'next/image';
import { condoData } from '../../../data/condoData';
import { MapPin, Users, Bed, Bath, Check, Clock, Phone } from 'lucide-react';

export const metadata = {
  title: 'Luxury Condo Details | Reef Condo Paradise Island',
  description: 'Discover your stunning oceanfront condo at The Reef Atlantis with premium amenities, breathtaking views, and full resort access.',
};

export default function CondoPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="/images/condo/condo_balconyview1.jpg.JPG"
          alt="Breathtaking ocean view from your private Reef Condo balcony"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="hero-title mb-4">Your Luxury Condo</h1>
            <p className="text-xl md:text-2xl font-light">
              {condoData.name}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 card">
            <Users className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{condoData.capacity.guests}</div>
            <div className="text-gray-cool">Guests</div>
          </div>
          <div className="text-center p-6 card">
            <Bed className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{condoData.capacity.bedrooms}</div>
            <div className="text-gray-cool">Bedrooms</div>
          </div>
          <div className="text-center p-6 card">
            <Bath className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{condoData.capacity.bathrooms}</div>
            <div className="text-gray-cool">Bathrooms</div>
          </div>
          <div className="text-center p-6 card">
            <MapPin className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{condoData.location.floor}</div>
            <div className="text-gray-cool">Floor</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="section-title">Welcome to Paradise</h2>
              <p className="text-lg leading-relaxed text-gray-cool mb-6">
                {condoData.description}
              </p>
              <div className="bg-sand-light p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-ocean-blue" />
                  <span className="font-semibold">Prime Location</span>
                </div>
                <p className="text-gray-cool">
                  {condoData.location.building} • {condoData.location.view}
                </p>
              </div>
            </section>

            {/* Photo Gallery Preview */}
            <section>
              <h2 className="section-title">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {condoData.images.slice(0, 6).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                    <Image
                      src={image}
                      alt={`Condo interior ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/gallery" className="btn-primary px-6 py-3 inline-block">
                  View All Photos
                </a>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="section-title">Premium Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {condoData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-sand-light rounded-lg transition-colors">
                    <Check className="h-5 w-5 text-success-green flex-shrink-0" />
                    <span className="text-gray-dark">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="section-title">Luxury Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {condoData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-sand-light rounded-lg transition-colors">
                    <Check className="h-5 w-5 text-ocean-blue flex-shrink-0" />
                    <span className="text-gray-dark">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Check-in Info */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-ocean-blue mr-2" />
                Check-in Information
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-dark">Check-in Time</div>
                  <div className="text-gray-cool">{condoData.checkIn.time}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-dark">Contact</div>
                  <a href={`tel:${condoData.checkIn.contact}`} className="text-ocean-blue hover:text-ocean-light">
                    {condoData.checkIn.contact}
                  </a>
                </div>
                <div className="pt-3 border-t border-sand-warm">
                  <div className="font-medium text-gray-dark mb-2">Process</div>
                  <ul className="space-y-1 text-sm text-gray-cool">
                    {condoData.checkIn.process.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-ocean-blue font-medium">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">House Rules</h3>
              <ul className="space-y-2">
                {condoData.houseRules.map((rule, index) => (
                  <li key={index} className="text-sm text-gray-cool flex items-start space-x-2">
                    <span className="text-coral-accent">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="card p-6 bg-gradient-to-br from-ocean-blue to-ocean-light text-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Need Help?
              </h3>
              <p className="mb-4 text-white/90">
                Have questions about your stay? We&apos;re here to help!
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:+15551234567" 
                  className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-colors"
                >
                  Call: +1 (555) 123-4567
                </a>
                <a 
                  href="mailto:hello@reefcondo.com" 
                  className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}