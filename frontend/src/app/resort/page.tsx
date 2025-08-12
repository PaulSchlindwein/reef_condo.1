import Image from 'next/image';
import { restaurants as localRestaurants, activities as localActivities, amenities as localAmenities } from '../../../data/resortData';
import { Utensils, Activity, MapPin, Star } from 'lucide-react';
import { getText, getList } from '@/content/client';
import { RestaurantItemSchema, ActivityItemSchema, AmenityItemSchema, SiteStatItemSchema } from '@/content/schema';
import { RestaurantCard } from '@/components/shared/RestaurantCard';
import { ActivityCard } from '@/components/shared/ActivityCard';
import { AmenityCard } from '@/components/shared/AmenityCard';

export const metadata = {
  title: 'Atlantis Resort Guide | Reef Condo Paradise Island',
  description: 'Discover world-class dining, thrilling activities, and luxury amenities at the Atlantis Resort during your stay at Reef Condo.',
};



export default async function ResortPage() {
  const heroTitle = await getText('resort.hero.title', 'Atlantis Resort Guide');
  const heroSubtitle = await getText('resort.hero.subtitle', 'Discover world-class dining, thrilling adventures, and luxury amenities at your fingertips');
  const diningIntro = await getText('resort.dining.intro', 'From celebrity chef restaurants to casual beachside dining, Atlantis offers culinary experiences for every taste and occasion.');
  const activitiesIntro = await getText('resort.activities.intro', 'From thrilling water slides to relaxing spa treatments, discover endless entertainment options for every age and interest.');
  const amenitiesIntro = await getText('resort.amenities.intro', 'Essential services and facilities to enhance your stay and ensure your comfort throughout your visit.');

  const restaurants = await getList('resort_restaurants', RestaurantItemSchema, localRestaurants);
  const activities = await getList('resort_activities', ActivityItemSchema, localActivities);
  const amenities = await getList('resort_amenities', AmenityItemSchema, localAmenities);

  const defaultStats = [
    { icon: 'utensils' as const, value: `${restaurants.length}+`, label: 'Restaurants' },
    { icon: 'activity' as const, value: `${activities.length}+`, label: 'Activities' },
    { icon: 'map-pin' as const, value: '5', label: 'Locations' },
    { icon: 'star' as const, value: '24/7', label: 'Access' },
  ];
  const siteStats = await getList('site_stats', SiteStatItemSchema, defaultStats);

  const IconMap: Record<string, React.ComponentType<{ className?: string }>> = { 'utensils': Utensils, 'activity': Activity, 'map-pin': MapPin, 'star': Star };

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
            <h1 className="hero-title mb-4">{heroTitle}</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Overview Stats (editable via site_stats collection) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {siteStats.map((s, idx: number) => {
            const Icon = IconMap[s.icon || 'star'] || Star;
            return (
              <div key={idx} className="text-center p-6 card">
                <Icon className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-dark">{s.value}</div>
                <div className="text-gray-cool">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Dining Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">World-Class Dining</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{diningIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Adventures & Activities</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{activitiesIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </section>

        {/* Amenities Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="section-title">Resort Amenities</h2>
            <p className="text-lg text-gray-cool max-w-3xl mx-auto">{amenitiesIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((amenity, index) => (
              <AmenityCard key={index} amenity={amenity} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}