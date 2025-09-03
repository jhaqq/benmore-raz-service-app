import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/3.svg" 
                alt="Domo Home Services" 
                width={300}
                height={80}
                className="h-16 w-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Professional home services with transparent pricing, instant booking, 
              and insured technicians. Your trusted partner for all home maintenance needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <PhoneIcon className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--primary-light)' }} />
                <a href="tel:+1-555-0123" className="hover:text-white transition-colors">
                  (555) 123-0456
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <EnvelopeIcon className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--primary-light)' }} />
                <a href="mailto:support@domo.com" className="hover:text-white transition-colors">
                  support@domo.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPinIcon className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--primary-light)' }} />
                <span>Serving urban areas nationwide</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <ClockIcon className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--primary-light)' }} />
                <span>Available 7 days a week, 8AM - 8PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-3" role="list">
              <li><Link href="/services/cleaning" className="text-gray-400 hover:text-white transition-colors text-sm">House Cleaning</Link></li>
              <li><Link href="/services/deep-cleaning" className="text-gray-400 hover:text-white transition-colors text-sm">Deep Cleaning</Link></li>
              <li><Link href="/services/handyman" className="text-gray-400 hover:text-white transition-colors text-sm">Handyman Services</Link></li>
              <li><Link href="/services/installation" className="text-gray-400 hover:text-white transition-colors text-sm">Installation Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Domo. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}