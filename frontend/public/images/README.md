# Image Organization Guide

## 📂 Folder Structure

### 🏠 `/condo/` - Condo Interior & Exterior
- `living-room.jpg` - Main living area
- `kitchen.jpg` - Kitchen and dining
- `master-bedroom.jpg` - Master bedroom
- `second-bedroom.jpg` - Guest bedroom
- `bathroom.jpg` - Bathroom(s)
- `balcony-view.jpg` - Balcony and ocean view
- `building-exterior.jpg` - Building exterior

### 🌊 `/resort/` - Atlantis Resort Photos
- `pools.jpg` - Resort pools and water features
- `restaurants.jpg` - Dining venues
- `casino.jpg` - Gaming areas
- `marina.jpg` - Marina village
- `activities.jpg` - Activities and entertainment

### 🏝️ `/area/` - Nassau & Paradise Island
- `nassau-downtown.jpg` - Downtown Nassau
- `paradise-beach.jpg` - Local beaches
- `straw-market.jpg` - Local attractions
- `local-restaurants.jpg` - Off-resort dining

### 🌅 `/views/` - Scenic Views
- `sunrise.jpg` - Morning views
- `sunset.jpg` - Evening views
- `ocean-panorama.jpg` - Wide ocean views
- `atlantis-view.jpg` - Resort views from condo

## 📐 Image Specifications

### Recommended Sizes:
- **Hero Images**: 1920x1080px (16:9 ratio)
- **Gallery Images**: 1200x800px (3:2 ratio)
- **Card Images**: 800x600px (4:3 ratio)
- **Thumbnails**: 400x300px (4:3 ratio)

### Formats:
- **Primary**: JPG (for photos)
- **Logos/Graphics**: PNG or SVG
- **WebP**: For better performance (Next.js auto-converts)

## 🔗 Usage in Code

```tsx
// Hero image
<Image src="/images/views/ocean-panorama.jpg" alt="Ocean view" />

// Condo gallery
<Image src="/images/condo/living-room.jpg" alt="Living room" />

// Resort features
<Image src="/images/resort/pools.jpg" alt="Resort pools" />
```

## 📝 Naming Convention
- Use lowercase with hyphens: `master-bedroom.jpg`
- Be descriptive: `balcony-sunset-view.jpg`
- Include location when helpful: `condo-kitchen-granite.jpg`