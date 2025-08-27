import Link from "next/link";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-lg">S</span>
              </div>
              <span className="text-xl font-medium">ServicePro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Professional home services with transparent pricing, instant booking, 
              and insured technicians. Your trusted partner for all home maintenance needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <PhoneIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+1-555-0123" className="hover:text-white transition-colors">
                  (555) 123-0456
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <EnvelopeIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@servicepro.com" className="hover:text-white transition-colors">
                  support@servicepro.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPinIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span>Serving urban areas nationwide</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <ClockIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
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
            © {new Date().getFullYear()} ServicePro. All rights reserved.
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