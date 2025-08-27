import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight text-balance">
            Professional Home Services,
            <span className="block text-blue-200 font-normal">Delivered Fast</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            Book trusted home service professionals for cleaning, handyman work, 
            and installations. Transparent pricing, instant booking, insured technicians.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="services"
              className="btn-primary text-white px-8 py-4 rounded-md font-medium text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              role="button"
              aria-label="Browse and book services"
            >
              Book a Service
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            
            <Link 
              href="/how-it-works"
              className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-300 hover:text-gray-900 transition-colors w-full sm:w-auto text-center"
              role="button"
              aria-label="Learn how our service works"
            >
              How It Works
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <MapPinIcon className="h-5 w-5" />
            <span>Serving urban areas nationwide</span>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 text-gray-300">
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">500+</div>
            <div className="text-sm text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">4.9</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">24hr</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}