export interface Restaurant {
  name: string;
  type: string;
  description: string;
  link?: string;
  status: 'active' | 'closed' | 'seasonal';
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  location: string;
  highlights: string[];
}

export interface Activity {
  name: string;
  type: string;
  description: string;
  link?: string;
  status: 'active' | 'closed' | 'seasonal';
  priceRange: '$' | '$$' | '$$$' | '$$$$' | 'included';
  location: string;
  ageGroup: 'all' | 'adults' | 'kids' | 'teens';
  highlights: string[];
}

export interface ResortAmenity {
  name: string;
  description: string;
  location: string;
  hours: string;
  status: 'active' | 'closed' | 'seasonal';
  link?: string;
}

export const restaurants: Restaurant[] = [
  {
    name: "Nobu",
    type: "Japanese Fine Dining",
    description: "World-renowned sushi and Japanese cuisine with signature dishes by Chef Nobu Matsuhisa",
    link: "https://www.atlantisbahamas.com/restaurants/nobu",
    status: "active",
    priceRange: "$$$$",
    location: "The Cove",
    highlights: ["Omakase experience", "Ocean views", "Premium sake selection"]
  },
  {
    name: "Fish by José Andrés",
    type: "Seafood & Mediterranean",
    description: "Creative Mediterranean seafood dishes by renowned chef José Andrés",
    link: "https://www.atlantisbahamas.com/restaurants/fish",
    status: "active",
    priceRange: "$$$",
    location: "The Cove",
    highlights: ["Fresh local seafood", "Innovative preparations", "Chef's tasting menu"]
  },
  {
    name: "Dune by Jean-Georges",
    type: "French Fine Dining",
    description: "Elegant French cuisine with Caribbean influences in a stunning oceanfront setting",
    link: "https://www.atlantisbahamas.com/restaurants/dune",
    status: "active",
    priceRange: "$$$$",
    location: "The Ocean Club",
    highlights: ["Oceanfront dining", "French technique", "Romantic atmosphere"]
  },
  {
    name: "Olives",
    type: "Mediterranean",
    description: "Mediterranean cuisine with fresh ingredients and vibrant flavors",
    status: "active",
    priceRange: "$$$",
    location: "Paradise Island",
    highlights: ["Healthy options", "Fresh ingredients", "Casual elegance"]
  },
  {
    name: "Carmichael's Steakhouse",
    type: "Steakhouse",
    description: "Premium steaks and classic American fare in an upscale setting",
    status: "active",
    priceRange: "$$$$",
    location: "Atlantis Casino",
    highlights: ["Prime cuts", "Wine selection", "Classic steakhouse experience"]
  },
  {
    name: "The Point",
    type: "Sports Bar & Grill",
    description: "Casual dining with sports viewing, burgers, and comfort food",
    status: "active",
    priceRange: "$$",
    location: "Atlantis Casino",
    highlights: ["Sports viewing", "Casual atmosphere", "American favorites"]
  },
  {
    name: "Café Martinique",
    type: "French Bistro",
    description: "Classic French bistro fare with a Caribbean twist",
    status: "active",
    priceRange: "$$$",
    location: "Paradise Island",
    highlights: ["French classics", "Outdoor seating", "Romantic setting"]
  }
];

export const activities: Activity[] = [
  {
    name: "Aquaventure Water Park",
    type: "Water Park",
    description: "World-class water park with thrilling slides, lazy river, and marine habitats",
    link: "https://www.atlantisbahamas.com/marine-habitat/aquaventure",
    status: "active",
    priceRange: "included",
    location: "Throughout Resort",
    ageGroup: "all",
    highlights: ["Leap of Faith slide", "Lazy river", "Private beaches", "Swimming with dolphins"]
  },
  {
    name: "The Casino",
    type: "Gaming",
    description: "24/7 casino with slots, table games, and poker room",
    link: "https://www.atlantisbahamas.com/casino",
    status: "active",
    priceRange: "$$",
    location: "Coral Towers",
    ageGroup: "adults",
    highlights: ["24/7 gaming", "Poker tournaments", "VIP gaming rooms"]
  },
  {
    name: "Mandara Spa",
    type: "Spa & Wellness",
    description: "Full-service spa with treatments inspired by ancient healing traditions",
    link: "https://www.atlantisbahamas.com/spa",
    status: "active",
    priceRange: "$$$",
    location: "The Cove",
    ageGroup: "adults",
    highlights: ["Couples treatments", "Ocean view treatment rooms", "Relaxation pools"]
  },
  {
    name: "Dolphin Cay",
    type: "Marine Experience",
    description: "Interactive dolphin experiences and sea lion encounters",
    link: "https://www.atlantisbahamas.com/things-to-do/dolphin-cay",
    status: "active",
    priceRange: "$$$",
    location: "Dolphin Cay",
    ageGroup: "all",
    highlights: ["Swim with dolphins", "Educational programs", "Sea lion encounters"]
  },
  {
    name: "Marina Village",
    type: "Shopping & Dining",
    description: "Waterfront shopping and dining with local crafts and international brands",
    status: "active",
    priceRange: "$$",
    location: "Paradise Island",
    ageGroup: "all",
    highlights: ["Waterfront setting", "Local crafts", "Duty-free shopping"]
  },
  {
    name: "Golf Course",
    type: "Golf",
    description: "18-hole championship golf course designed by Tom Weiskopf",
    link: "https://www.atlantisbahamas.com/golf",
    status: "active",
    priceRange: "$$$",
    location: "Paradise Island",
    ageGroup: "all",
    highlights: ["Championship course", "Ocean views", "Pro shop"]
  },
  {
    name: "Tennis Courts",
    type: "Sports",
    description: "Professional tennis courts with equipment rental available",
    status: "active",
    priceRange: "$$",
    location: "Paradise Island",
    ageGroup: "all",
    highlights: ["Professional courts", "Equipment rental", "Lessons available"]
  }
];

export const amenities: ResortAmenity[] = [
  {
    name: "Fitness Center",
    description: "State-of-the-art fitness facility with cardio and strength equipment",
    location: "The Cove",
    hours: "6:00 AM - 10:00 PM",
    status: "active",
    link: "https://www.atlantisbahamas.com/amenities/fitness"
  },
  {
    name: "Business Center",
    description: "Full-service business center with printing, internet, and meeting facilities",
    location: "Coral Towers Lobby",
    hours: "24/7",
    status: "active"
  },
  {
    name: "Concierge Services",
    description: "Full concierge services for restaurant reservations, tours, and activities",
    location: "All Towers",
    hours: "24/7",
    status: "active"
  },
  {
    name: "Valet Parking",
    description: "Complimentary valet parking for resort guests",
    location: "All Entrances",
    hours: "24/7",
    status: "active"
  },
  {
    name: "Private Beaches",
    description: "Multiple private beaches with loungers, umbrellas, and water sports",
    location: "Throughout Resort",
    hours: "Sunrise - Sunset",
    status: "active"
  }
];