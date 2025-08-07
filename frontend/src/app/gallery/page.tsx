import ImageGallery from '../../../components/ImageGallery';
import { galleryImages } from '../../../data/galleryData';
import { Camera, Image as ImageIcon, Building, Waves, MapPin, Eye } from 'lucide-react';

export const metadata = {
  title: 'Photo Gallery | Reef Condo Paradise Island',
  description: 'Browse stunning photos of your luxury Reef Condo, Atlantis Resort amenities, and Nassau area attractions.',
};

export default function GalleryPage() {
  const categoryStats = {
    condo: galleryImages.filter(img => img.category === 'condo').length,
    resort: galleryImages.filter(img => img.category === 'resort').length,
    area: galleryImages.filter(img => img.category === 'area').length,
    views: galleryImages.filter(img => img.category === 'views').length,
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-gradient-to-br from-ocean-blue to-ocean-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h1 className="hero-title mb-4">Photo Gallery</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Explore {galleryImages.length} stunning photos of your paradise getaway
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Gallery Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 card">
            <Building className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{categoryStats.condo}</div>
            <div className="text-gray-cool">Condo Photos</div>
          </div>
          <div className="text-center p-6 card">
            <Waves className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{categoryStats.resort}</div>
            <div className="text-gray-cool">Resort Photos</div>
          </div>
          <div className="text-center p-6 card">
            <MapPin className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{categoryStats.area}</div>
            <div className="text-gray-cool">Area Photos</div>
          </div>
          <div className="text-center p-6 card">
            <Eye className="h-8 w-8 text-ocean-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-dark">{categoryStats.views}</div>
            <div className="text-gray-cool">View Photos</div>
          </div>
        </div>

        {/* Gallery Instructions */}
        <div className="text-center mb-12">
          <h2 className="section-title">Explore Your Paradise</h2>
          <p className="text-lg text-gray-cool max-w-3xl mx-auto leading-relaxed mb-6">
            Click on any photo to view it in full screen. Use the category filters to explore specific areas, 
            or browse all photos to see everything your Bahamian getaway has to offer.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-cool">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Click to enlarge</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>←→</span>
              <span>Navigate photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>ESC</span>
              <span>Close view</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Component */}
        <ImageGallery 
          images={galleryImages} 
          title="Reef Condo Gallery" 
        />

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-br from-ocean-blue to-ocean-light rounded-lg text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience This Paradise?</h3>
          <p className="text-lg mb-6 text-white/90">
            These photos are just the beginning. Book your stay and create your own amazing memories!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/condo" 
              className="bg-white text-ocean-blue px-6 py-3 rounded-lg font-semibold hover:bg-sand-light transition-colors"
            >
              View Condo Details
            </a>
            <a 
              href="/info" 
              className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Booking Information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}