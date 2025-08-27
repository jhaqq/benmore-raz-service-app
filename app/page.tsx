import Link from "next/link";
import { ClockIcon, ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";
import ServiceCard from "@/components/ServiceCard";
import Hero from "@/components/Hero";

const services = [
  {
    id: 1,
    name: "House Cleaning",
    category: "cleaning",
    description: "Professional house cleaning service with flat-rate pricing based on number of bedrooms",
    basePrice: 80,
    priceType: "rooms",
    imageUrl: "/images/house-cleaning.jpg",
    durationMinutes: 120,
    features: ["Deep cleaning", "Eco-friendly products", "Insured cleaners"]
  },
  {
    id: 2,
    name: "Deep Cleaning",
    category: "cleaning", 
    description: "Comprehensive deep cleaning for move-in/move-out or seasonal cleaning",
    basePrice: 150,
    priceType: "rooms",
    imageUrl: "/images/deep-cleaning.jpg",
    durationMinutes: 240,
    features: ["Move-in/out ready", "All surfaces", "Detailed work"]
  },
  {
    id: 3,
    name: "Handyman Services",
    category: "repair",
    description: "General handyman services including mounting, assembly, and minor repairs",
    basePrice: 75,
    priceType: "item",
    imageUrl: "/images/handyman.jpg",
    durationMinutes: 60,
    features: ["TV mounting", "Furniture assembly", "Minor repairs"]
  },
  {
    id: 4,
    name: "Installation Services",
    category: "installation",
    description: "Professional installation of appliances and home equipment",
    basePrice: 100,
    priceType: "item", 
    imageUrl: "/images/installation.jpg",
    durationMinutes: 90,
    features: ["Wi-Fi setup", "Smart devices", "Appliance install"]
  }
];

export default function Home() {
  return (
    <>
      {/* Structured data for AI agents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ServicePro",
            "description": "Professional home services including cleaning, handyman, and installation services",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "serviceType": ["House Cleaning", "Handyman Services", "Installation Services"],
            "areaServed": "Urban areas",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Home Services",
              "itemListElement": services.map(service => ({
                "@type": "Offer",
                "name": service.name,
                "description": service.description,
                "price": service.basePrice,
                "priceCurrency": "USD",
                "availability": "InStock",
                "validFrom": new Date().toISOString()
              }))
            }
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto" id="services">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional home services with transparent, flat-rate pricing. 
              Book instantly and get confirmed within minutes.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose ServicePro?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <ClockIcon className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Booking</h3>
                <p className="text-gray-600">
                  Book your service in under 2 minutes. Get confirmed scheduling within 15 minutes.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <ShieldCheckIcon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Insured & Vetted</h3>
                <p className="text-gray-600">
                  All our service providers are background-checked, insured, and highly rated.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-amber-100">
                  <StarIcon className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">
                  No hidden fees. Flat-rate pricing so you know exactly what you'll pay upfront.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Choose a service above and book your appointment in minutes.
            </p>
            <Link 
              href="#services"
              className="btn-primary inline-block text-white px-8 py-3 rounded-md font-medium text-lg"
              role="button"
              aria-label="Book a service now"
            >
              Book Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}