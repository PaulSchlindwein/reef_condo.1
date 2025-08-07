import { Phone, MapPin, Clock, DollarSign, Info, Wifi, Car, Users, Waves, Key, Star } from 'lucide-react';

export const metadata = {
  title: 'Essential Guest Information | Reef Condo Paradise Island',
  description: 'Everything you need to know for your stay at Reef Condo - insider tips, contact information, and practical details.',
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}

function InfoCard({ icon, title, children, highlight = false }: InfoCardProps) {
  return (
    <div className={`card p-6 ${highlight ? 'border-coral-accent bg-coral-accent/5' : ''}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${highlight ? 'bg-coral-accent text-white' : 'bg-ocean-blue text-white'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-dark">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function InfoPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-ocean-blue to-ocean-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Info className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h1 className="hero-title mb-4">Essential Information</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Insider tips and practical details for the perfect stay
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Your Unit Information */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Your Reef Condo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InfoCard
              icon={<Key className="h-6 w-6" />}
              title="Unit Details"
              highlight={true}
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-cool">Unit Number:</span>
                  <span className="font-semibold">6-921</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-cool">Building:</span>
                  <span className="font-semibold">The Reef Atlantis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-cool">Floor:</span>
                  <span className="font-semibold">9th Floor</span>
                </div>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Phone className="h-6 w-6" />}
              title="Owner Services"
            >
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-ocean-blue">1-888-877-7598</p>
                  <p className="text-sm text-gray-cool">or Hotel Ext. 38</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-cool" />
                  <span>Available 8 AM - 5 PM daily</span>
                </div>
                <p className="text-sm text-gray-cool">Located in the lobby</p>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Wifi className="h-6 w-6" />}
              title="WiFi Access"
            >
              <div className="space-y-3">
                <p className="text-success-green font-semibold">✓ FREE in owner units</p>
                <p className="text-sm text-gray-cool">
                  <strong>Note:</strong> Ignore any signs saying WiFi isn't free - it's included in owner units!
                </p>
                <p className="text-sm text-gray-cool">
                  Check The Reef Guide on TV for daily free activities.
                </p>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* Transportation */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Transportation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard
              icon={<Car className="h-6 w-6" />}
              title="Airport Transportation"
            >
              <div className="space-y-4">
                <div className="border-b border-sand-warm pb-3">
                  <h4 className="font-semibold text-gray-dark">Majestic Tours Bus</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Adults:</span>
                      <span className="font-semibold">$34 roundtrip</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Children (11 & under):</span>
                      <span className="font-semibold">$17 roundtrip</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-dark">Showtime Limo Service</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>One way:</span>
                      <span className="font-semibold">$91</span>
                    </div>
                    <div className="flex justify-between">
                      <span>With grocery stop:</span>
                      <span className="font-semibold">+$50</span>
                    </div>
                    <p className="text-xs text-gray-cool">Book through Owner Services</p>
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Waves className="h-6 w-6" />}
              title="Free Resort Shuttles"
            >
              <div className="space-y-3">
                <p className="text-success-green font-semibold">✓ Completely FREE</p>
                <ul className="text-sm space-y-1 text-gray-cool">
                  <li>• Available in front of hotel</li>
                  <li>• Every 5-10 minutes</li>
                  <li>• All resort hotels & Marina Village</li>
                  <li>• Ocean Club access</li>
                </ul>
                <div className="bg-sand-light p-3 rounded-lg">
                  <p className="text-sm"><strong>Tip:</strong> Check signs above bus doors or ask drivers - they're very helpful!</p>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* Resort Amenities & Pricing */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Resort Amenities & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard
              icon={<Users className="h-6 w-6" />}
              title="Cabana Rentals"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-dark">The Current Riverbend</h4>
                  <p className="text-ocean-blue font-semibold">$600/day (10 people)</p>
                  <ul className="text-sm text-gray-cool mt-2">
                    <li>• Wait service included</li>
                    <li>• Fan & towels</li>
                    <li>• Mini fridge</li>
                    <li>• Power for charging</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-cool">
                  <strong>Tip:</strong> Poseidon Cabanas 13 & 14 are great for small kids near the play area.
                </p>
              </div>
            </InfoCard>

            <InfoCard
              icon={<MapPin className="h-6 w-6" />}
              title="Golf (Ocean Club)"
            >
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Morning rounds:</span>
                    <span className="font-semibold">$295</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Afternoon rounds:</span>
                    <span className="font-semibold">$245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Club rental:</span>
                    <span className="font-semibold">$85</span>
                  </div>
                </div>
                <p className="text-sm text-gray-cool">
                  Callaway Rogue irons & woods, Odyssey putters
                </p>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Star className="h-6 w-6" />}
              title="Mandara Spa"
            >
              <div className="space-y-3">
                <p className="text-success-green font-semibold">15% Owner Discount</p>
                <p className="text-sm text-gray-cool">
                  Book through Owner Services for discount
                </p>
                <p className="text-sm text-gray-cool">
                  (20% gratuity included in listed prices)
                </p>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* Marine Experiences */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Marine Experiences (Dolphin Cay)</h2>
          <div className="card p-6">
            <p className="text-center text-gray-cool mb-6">
              <strong>Check with Owner Services for possible discounts!</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-dark">Dolphin Deep Water</h4>
                <p className="text-ocean-blue font-bold text-lg">$250</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-dark">Sea Lion Playtime</h4>
                <p className="text-ocean-blue font-bold text-lg">$250</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-dark">Snorkel the Ruins</h4>
                <p className="text-ocean-blue font-bold text-lg">$175</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-cool mt-4">
              Plus many more experiences available - ask Owner Services for full list!
            </p>
          </div>
        </section>

        {/* Essential Services */}
        <section className="mb-16">
          <h2 className="section-title text-center mb-12">Essential Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard
              icon={<Key className="h-6 w-6" />}
              title="Wristbands & Beach Access"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-dark">Getting Wristbands</h4>
                  <p className="text-sm text-gray-cool">Pick up at towel hut outside The Reef using your room key (required for pools)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-dark">Private Owners Beach</h4>
                  <ul className="text-sm text-gray-cool space-y-1">
                    <li>• Right in front of Reef Building</li>
                    <li>• Show owners room key if asked</li>
                    <li>• Attendants arrange chairs & towels</li>
                    <li>• Wait service available</li>
                    <li>• Pre-arrange for next day</li>
                  </ul>
                  <p className="text-sm text-coral-accent font-semibold mt-2">💡 Please tip beach attendants well!</p>
                </div>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Waves className="h-6 w-6" />}
              title="Laundry & Housekeeping"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-dark">In-Unit Washer/Dryer</h4>
                  <p className="text-sm text-gray-cool">If it stops working, check the GFI outlet first before calling Owner Services</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-dark">Free Laundry Room</h4>
                  <p className="text-sm text-gray-cool">Full-size machines on 2nd floor at Owner Services</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-dark">Daily Maid Service</h4>
                  <p className="text-sm text-gray-cool">Use "MAKE UP ROOM" & "DO NOT DISTURB" buttons by entry light switches</p>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* Pro Tips */}
        <section>
          <h2 className="section-title text-center mb-12">Insider Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard
              icon={<Info className="h-6 w-6" />}
              title="Transit Lounge"
              highlight={true}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-cool">Located in lobby across from elevators</p>
                <ul className="text-sm text-gray-cool space-y-1">
                  <li>• Store luggage after checkout</li>
                  <li>• Changing rooms available</li>
                  <li>• Enjoy beach & pool after checkout</li>
                </ul>
              </div>
            </InfoCard>

            <InfoCard
              icon={<DollarSign className="h-6 w-6" />}
              title="Money-Saving Tips"
              highlight={true}
            >
              <div className="space-y-3">
                <ul className="text-sm text-gray-cool space-y-1">
                  <li>• Use provided water bottles at filling stations</li>
                  <li>• Free shuttle instead of taxis</li>
                  <li>• Owner Services for discounts</li>
                  <li>• Check Reef Guide for free activities</li>
                  <li>• Pre-arrange beach chairs</li>
                </ul>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-16">
          <div className="card p-8 bg-gradient-to-br from-coral-accent to-ocean-blue text-white text-center">
            <Phone className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need Help During Your Stay?</h3>
            <div className="space-y-2 mb-6">
              <p className="text-xl font-semibold">Owner Services: 1-888-877-7598</p>
              <p>Hotel Extension: 38 • Available 8 AM - 5 PM Daily</p>
            </div>
            <p className="text-white/90">
              The Owner Services team is your best resource for discounts, reservations, and any questions during your stay!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}