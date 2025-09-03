import Link from "next/link";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  priceType: string;
  durationMinutes: number;
  features: string[];
}

interface ServiceCardProps {
  service: Service;
}

const serviceIcons: Record<string, React.ReactElement> = {
  cleaning: (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M8 5v4m8-4v4"/>
    </svg>
  ),
  repair: (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  installation: (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  maintenance: (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.42-.243l-.228-2.284a1 1 0 00-.993-.876H9.394a1 1 0 00-.993.876l-.228 2.284a6 6 0 00-.42.243l-2.388.477a2 2 0 00-1.022.547l-.784.78a1 1 0 00-.187 1.181l1.263 2.127a1 1 0 001.075.495l2.372-.237a6 6 0 00.421.243l.228 2.284a1 1 0 00.993.876h1.566a1 1 0 00.993-.876l.228-2.284a6 6 0 00.421-.243l2.372.237a1 1 0 001.075-.495l1.263-2.127a1 1 0 00-.187-1.181l-.784-.78z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  moving: (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
    </svg>
  )
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const getPriceText = (basePrice: number, priceType: string) => {
    switch (priceType) {
      case 'rooms':
        return `Starting at $${basePrice}`;
      case 'item':
        return `From $${basePrice}`;
      case 'hourly':
        return `$${basePrice}/hour`;
      default:
        return `$${basePrice}`;
    }
  };

  const getCategoryIcon = (category: string) => {
    return serviceIcons[category] || serviceIcons['repair'];
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden h-full flex flex-col transition-all duration-200 hover:-translate-y-1 min-h-[420px] md:min-h-[380px] sm:min-h-[360px]"
      itemScope 
      itemType="https://schema.org/Service"
    >
      {/* Service Icon */}
      <div className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            {getCategoryIcon(service.category)}
          </div>
          <span 
            className="text-xs font-medium text-white uppercase tracking-wider px-2 py-1 rounded-sm" 
            style={{ 
              backgroundColor: '#0a1f44',
              color: 'white'
            }}
          >
            {service.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-3" itemProp="name">
          {service.name}
        </h3>
        
        <p className="text-gray-700 text-sm mb-4 leading-relaxed overflow-hidden" 
           style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}} 
           itemProp="description">
          {service.description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-6 flex-1" role="list">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-800">
              <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Pricing and Duration */}
        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-gray-900" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span itemProp="price">{getPriceText(service.basePrice, service.priceType)}</span>
                <meta itemProp="priceCurrency" content="USD" />
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span itemProp="duration">{formatDuration(service.durationMinutes)} typical</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-auto">
          <Link 
            href="/services"
            className="btn-primary block w-full text-white py-3 px-4 rounded-md font-medium text-center text-sm transition-all duration-200 hover:transform hover:scale-105"
            role="button"
            aria-label={`View services and book ${service.name}`}
          >
            Book Service
          </Link>
        </div>
      </div>
      
      {/* Hidden structured data for AI agents */}
      <meta itemProp="provider" content="Domo" />
      <meta itemProp="areaServed" content="Urban areas" />
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
        <meta itemProp="availability" content="InStock" />
        <meta itemProp="validFrom" content={new Date().toISOString()} />
      </div>
    </article>
  );
}