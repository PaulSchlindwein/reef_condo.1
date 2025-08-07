export interface CondoDetails {
  id: string;
  name: string;
  description: string;
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
  };
  amenities: string[];
  features: string[];
  images: string[];
  checkIn: {
    process: string[];
    time: string;
    contact: string;
  };
  houseRules: string[];
  location: {
    building: string;
    floor: string;
    view: string;
  };
}

export const condoData: CondoDetails = {
  id: "reef-condo-atlantis",
  name: "Luxury Reef Condo at Atlantis",
  description: "Experience paradise in this stunning oceanfront condo with breathtaking views of the Atlantis Resort and crystal-clear Caribbean waters. Perfect for families and couples seeking a tropical getaway with all the luxury amenities.",
  capacity: {
    guests: 6,
    bedrooms: 2,
    bathrooms: 2
  },
  amenities: [
    "Fully equipped modern kitchen",
    "High-speed WiFi throughout",
    "Smart TV with streaming services",
    "Air conditioning in all rooms",
    "Private balcony with ocean views",
    "In-unit washer and dryer",
    "Premium bedding and linens",
    "Beach towels provided",
    "Kitchen essentials and appliances",
    "Iron and ironing board"
  ],
  features: [
    "Floor-to-ceiling windows",
    "Modern tropical decor",
    "Open-concept living space",
    "Master suite with ensuite bathroom",
    "Walk-in shower with rainfall head",
    "Granite countertops",
    "Stainless steel appliances",
    "Private entrance",
    "Secure building access",
    "24/7 concierge services"
  ],
  images: [
    "/images/condo/condo_livingroom_family.jpg.jpg",
    "/images/condo/condo_kitchen.jpg.JPG",
    "/images/condo/condo_kitchen1.jpg.JPG",
    "/images/condo/condo_balconyview.jpg.JPG",
    "/images/condo/condo_balconyview1.jpg.JPG",
    "/images/condo/condo_bathroom.jpg.JPG",
    "/images/condo/condo_bathroom1.jpg.JPG",
    "/images/condo/condo_floorplan.jpg.jpeg"
  ],
  checkIn: {
    process: [
      "Contact host 24 hours before arrival for check-in instructions",
      "Receive keycode and detailed directions via text/email",
      "Self check-in available 24/7",
      "Welcome package with resort maps and recommendations provided"
    ],
    time: "4:00 PM - 10:00 PM",
    contact: "+1 (555) 123-4567"
  },
  houseRules: [
    "Maximum 6 guests",
    "No smoking inside the unit",
    "No parties or events",
    "Quiet hours: 10 PM - 8 AM",
    "Check-out by 11:00 AM",
    "Please secure balcony doors during storms",
    "Resort wristbands required for amenities (arranged upon arrival)",
    "Please dispose of trash in designated areas"
  ],
  location: {
    building: "The Reef Atlantis",
    floor: "12th Floor",
    view: "Ocean and Atlantis Resort views"
  }
};