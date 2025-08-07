'use client';

import Hero from '../../components/Hero';
import InfoCard from '../../components/InfoCard';
import { Building, MapPin, Camera, Info, Waves, Utensils } from 'lucide-react';

const navigationCards = [
  {
    href: '/condo',
    title: 'Your Condo',
    description: 'Luxurious oceanfront accommodations with stunning views and premium amenities.',
    icon: Building,
    gradient: 'from-ocean-blue to-ocean-light',
  },
  {
    href: '/resort',
    title: 'Resort Guide',
    description: 'Discover world-class dining, thrilling activities, and exclusive resort amenities.',
    icon: Waves,
    gradient: 'from-ocean-light to-coral-accent',
  },
  {
    href: '/area',
    title: 'Area Guide',
    description: 'Explore Nassau, Paradise Island attractions, and local hidden gems.',
    icon: MapPin,
    gradient: 'from-coral-accent to-ocean-blue',
  },
  {
    href: '/gallery',
    title: 'Photo Gallery',
    description: 'Browse stunning photos of the condo, resort, and beautiful Bahamian scenery.',
    icon: Camera,
    gradient: 'from-ocean-blue to-ocean-light',
  },
  {
    href: '/info',
    title: 'Practical Info',
    description: 'Everything you need to know for a seamless and memorable stay.',
    icon: Info,
    gradient: 'from-ocean-light to-coral-accent',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Paradise Awaits at Reef Condo"
        subtitle="Welcome to Your Slice of Paradise"
        description="Experience luxury at its finest in our stunning oceanfront condo at The Reef Atlantis. With breathtaking views, premium amenities, and full resort access, your perfect Bahamian getaway starts here."
        imageUrl="/images/views/view_of_royal_towers.jpg"
        imageAlt="Spectacular view of the iconic Atlantis Royal Towers from Reef Condo"
      />

      {/* Navigation Cards Section */}
      <section className="py-20 bg-sand-light">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Your Stay</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto leading-relaxed">
              Everything you need to make the most of your Paradise Island vacation. 
              From condo details to local attractions, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => (
              <InfoCard
                key={card.href}
                {...card}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Highlights Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Reef Condo?</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto leading-relaxed">
              Premium location, luxury amenities, and unbeatable value in the heart of Paradise Island.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-blue to-ocean-light flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-cool">Direct access to Atlantis Resort amenities and private beaches</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-light to-coral-accent flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ocean Views</h3>
              <p className="text-gray-cool">Breathtaking panoramic views of the Caribbean Sea</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral-accent to-ocean-blue flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">World-Class Dining</h3>
              <p className="text-gray-cool">Access to celebrity chef restaurants and local favorites</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-blue to-ocean-light flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unforgettable Memories</h3>
              <p className="text-gray-cool">Perfect for families, couples, and special celebrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ocean-blue to-ocean-light text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Paradise?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Have questions about your stay? We're here to help make your Bahamian vacation perfect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+15551234567"
              className="bg-white text-ocean-blue px-8 py-4 rounded-lg font-semibold hover:bg-sand-light transition-colors"
            >
              Call: +1 (555) 123-4567
            </a>
            <a 
              href="mailto:hello@reefcondo.com"
              className="border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
