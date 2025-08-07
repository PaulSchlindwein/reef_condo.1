export interface Attraction {
  name: string;
  type: string;
  description: string;
  link?: string;
  status: 'active' | 'closed' | 'seasonal';
  priceRange: '$' | '$$' | '$$$' | 'free';
  location: string;
  distance: string;
  highlights: string[];
  transportOptions: string[];
}

export interface LocalRestaurant {
  name: string;
  type: string;
  description: string;
  link?: string;
  status: 'active' | 'closed';
  priceRange: '$' | '$$' | '$$$';
  location: string;
  distance: string;
  highlights: string[];
  localFavorite: boolean;
}

export interface Transportation {
  type: string;
  description: string;
  priceRange: '$' | '$$' | '$$$';
  duration: string;
  highlights: string[];
  bookingInfo: string;
}

export const nassauAttractions: Attraction[] = [
  {
    name: "Downtown Nassau",
    type: "Historic District",
    description: "Colorful colonial architecture, historic sites, and local culture",
    status: "active",
    priceRange: "free",
    location: "Nassau",
    distance: "10 minutes by taxi",
    highlights: ["Parliament Square", "Government House", "Colonial architecture", "Local shops"],
    transportOptions: ["Taxi", "Rental car", "Public bus", "Walking tour"]
  },
  {
    name: "Straw Market",
    type: "Shopping",
    description: "Traditional Bahamian crafts, souvenirs, and local artwork",
    status: "active",
    priceRange: "$",
    location: "Downtown Nassau",
    distance: "10 minutes by taxi",
    highlights: ["Handmade crafts", "Local artwork", "Bargaining culture", "Authentic souvenirs"],
    transportOptions: ["Taxi", "Walking from downtown"]
  },
  {
    name: "Queen's Staircase",
    type: "Historic Site",
    description: "66 limestone steps carved by slaves in the 1790s",
    status: "active",
    priceRange: "free",
    location: "Nassau",
    distance: "12 minutes by taxi",
    highlights: ["Historic significance", "Limestone carving", "Waterfall", "Photo opportunity"],
    transportOptions: ["Taxi", "Guided tour", "Rental car"]
  },
  {
    name: "Fort Charlotte",
    type: "Historic Fort",
    description: "18th-century British colonial fort with tunnels and cannons",
    status: "active",
    priceRange: "$",
    location: "Nassau",
    distance: "15 minutes by taxi",
    highlights: ["Colonial history", "Underground tunnels", "Ocean views", "Guided tours"],
    transportOptions: ["Taxi", "Rental car", "Guided tour"]
  },
  {
    name: "Junkanoo Beach",
    type: "Public Beach",
    description: "Popular public beach with clear water and local atmosphere",
    status: "active",
    priceRange: "free",
    location: "Nassau",
    distance: "8 minutes by taxi",
    highlights: ["Clear water", "Local vibe", "Beach bars", "Water sports rentals"],
    transportOptions: ["Taxi", "Walking", "Rental car"]
  }
];

export const paradiseIslandAttractions: Attraction[] = [
  {
    name: "Paradise Island Beach",
    type: "Public Beach",
    description: "Beautiful white sand beach accessible to the public",
    status: "active",
    priceRange: "free",
    location: "Paradise Island",
    distance: "5 minutes by taxi",
    highlights: ["White sand", "Clear water", "Less crowded", "Beautiful sunsets"],
    transportOptions: ["Taxi", "Walking", "Rental car"]
  },
  {
    name: "Marina Village",
    type: "Shopping & Dining",
    description: "Waterfront shopping and dining complex",
    status: "active",
    priceRange: "$$",
    location: "Paradise Island",
    distance: "Walking distance",
    highlights: ["Waterfront dining", "Duty-free shopping", "Local crafts", "Entertainment"],
    transportOptions: ["Walking", "Hotel shuttle"]
  },
  {
    name: "Versailles Gardens",
    type: "Gardens",
    description: "Formal French gardens with terraces and ocean views",
    status: "active",
    priceRange: "free",
    location: "One&Only Ocean Club",
    distance: "10 minutes by taxi",
    highlights: ["French gardens", "Ocean views", "Historic cloisters", "Photo opportunities"],
    transportOptions: ["Taxi", "Rental car"]
  }
];

export const localRestaurants: LocalRestaurant[] = [
  {
    name: "Arawak Cay (Fish Fry)",
    type: "Local Seafood",
    description: "Authentic Bahamian conch fritters, fish, and local specialties",
    status: "active",
    priceRange: "$",
    location: "Nassau",
    distance: "12 minutes by taxi",
    highlights: ["Conch fritters", "Fresh fish", "Local atmosphere", "Live music"],
    localFavorite: true
  },
  {
    name: "Goldie's Conch House",
    type: "Bahamian Cuisine",
    description: "Famous for the best conch salad and fritters on the island",
    status: "active",
    priceRange: "$",
    location: "Potter's Cay",
    distance: "15 minutes by taxi",
    highlights: ["Fresh conch salad", "Made to order", "Local institution", "Waterfront location"],
    localFavorite: true
  },
  {
    name: "Poop Deck",
    type: "Seafood Restaurant",
    description: "Casual waterfront dining with fresh seafood and harbor views",
    status: "active",
    priceRange: "$$",
    location: "Nassau Harbour",
    distance: "10 minutes by taxi",
    highlights: ["Harbor views", "Fresh seafood", "Local favorites", "Casual atmosphere"],
    localFavorite: true
  },
  {
    name: "Twin Brothers",
    type: "Bahamian Cuisine",
    description: "Authentic Bahamian dishes in a local neighborhood setting",
    status: "active",
    priceRange: "$",
    location: "Nassau",
    distance: "15 minutes by taxi",
    highlights: ["Authentic cuisine", "Peas and rice", "Curry dishes", "Local crowd"],
    localFavorite: true
  },
  {
    name: "McKenzie's Fresh Fish & Conch",
    type: "Seafood Shack",
    description: "Fresh conch and fish prepared while you wait",
    status: "active",
    priceRange: "$",
    location: "Potter's Cay",
    distance: "15 minutes by taxi",
    highlights: ["Made fresh to order", "Authentic preparation", "Local favorite", "Casual dining"],
    localFavorite: true
  }
];

export const transportation: Transportation[] = [
  {
    type: "Taxi",
    description: "Most convenient option for getting around Nassau and Paradise Island",
    priceRange: "$$",
    duration: "5-20 minutes depending on destination",
    highlights: ["Door-to-door service", "No waiting", "Local drivers", "Fixed rates available"],
    bookingInfo: "Available at hotel entrance or call +1-242-323-5818"
  },
  {
    type: "Rental Car",
    description: "Freedom to explore at your own pace (remember: drive on the left!)",
    priceRange: "$$$",
    duration: "Full day access",
    highlights: ["Complete freedom", "Explore remote areas", "Cost-effective for multiple trips"],
    bookingInfo: "Major agencies available at airport and hotels"
  },
  {
    type: "Public Bus (Jitney)",
    description: "Colorful local buses that connect Nassau and surrounding areas",
    priceRange: "$",
    duration: "20-45 minutes depending on route",
    highlights: ["Very affordable", "Local experience", "Frequent service", "Cultural immersion"],
    bookingInfo: "Flag down on street, exact change required ($1.25 USD)"
  },
  {
    type: "Tour Groups",
    description: "Organized tours with transportation included",
    priceRange: "$$$",
    duration: "Half-day to full-day options",
    highlights: ["Guided experience", "Transportation included", "Group discounts", "Educational"],
    bookingInfo: "Book through hotel concierge or tour operators"
  },
  {
    type: "Water Taxi",
    description: "Scenic boat rides between Nassau and Paradise Island harbors",
    priceRange: "$$",
    duration: "10-15 minutes",
    highlights: ["Scenic harbor views", "Unique experience", "Avoid bridge traffic"],
    bookingInfo: "Departs from Nassau Harbor and Paradise Island Harbor"
  }
];