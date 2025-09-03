'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, PlusIcon, MinusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingServiceCard from '../../components/LoadingServiceCard';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  priceType: string;
  durationMinutes: number;
  features: string[];
  items?: ServiceItem[];
}

interface ServiceItem {
  id: number;
  name: string;
  price: number;
  unit: string;
}

interface SelectedServiceItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  serviceId: number;
  serviceName: string;
  category: string;
  items: SelectedServiceItem[];
  totalPrice: number;
}

const mockServices: Service[] = [
  // Cleaning Services
  {
    id: 1,
    name: "House Cleaning",
    category: "cleaning",
    description: "Professional house cleaning service with flat-rate pricing based on number of bedrooms",
    basePrice: 80,
    priceType: "rooms",
    durationMinutes: 120,
    features: ["Deep cleaning", "Eco-friendly products", "Insured cleaners"],
    items: [
      { id: 1, name: 'Studio/1 Bedroom', price: 80, unit: 'per_cleaning' },
      { id: 2, name: '2 Bedrooms', price: 120, unit: 'per_cleaning' },
      { id: 3, name: '3 Bedrooms', price: 160, unit: 'per_cleaning' },
      { id: 4, name: '4+ Bedrooms', price: 200, unit: 'per_cleaning' }
    ]
  },
  {
    id: 2,
    name: "Deep Cleaning",
    category: "cleaning", 
    description: "Comprehensive deep cleaning for move-in/move-out or seasonal cleaning",
    basePrice: 150,
    priceType: "rooms",
    durationMinutes: 240,
    features: ["Move-in/out ready", "All surfaces", "Detailed work"],
    items: [
      { id: 5, name: 'Studio/1 Bedroom Deep Clean', price: 150, unit: 'per_cleaning' },
      { id: 6, name: '2 Bedrooms Deep Clean', price: 220, unit: 'per_cleaning' },
      { id: 7, name: '3 Bedrooms Deep Clean', price: 290, unit: 'per_cleaning' },
      { id: 8, name: '4+ Bedrooms Deep Clean', price: 360, unit: 'per_cleaning' }
    ]
  },
  {
    id: 3,
    name: "Post-Construction Cleanup",
    category: "cleaning",
    description: "Specialized cleaning after renovations, construction, or major repairs",
    basePrice: 200,
    priceType: "rooms",
    durationMinutes: 360,
    features: ["Dust removal", "Debris cleanup", "Surface restoration"],
    items: [
      { id: 17, name: 'Single Room', price: 200, unit: 'per_room' },
      { id: 18, name: 'Full Apartment', price: 400, unit: 'per_cleaning' },
      { id: 19, name: 'Full House', price: 600, unit: 'per_cleaning' },
      { id: 20, name: 'Commercial Space', price: 800, unit: 'per_cleaning' }
    ]
  },
  {
    id: 4,
    name: "Office Cleaning",
    category: "cleaning",
    description: "Professional commercial cleaning for offices and workspaces",
    basePrice: 120,
    priceType: "item",
    durationMinutes: 180,
    features: ["Sanitization", "Flexible scheduling", "Bonded staff"],
    items: [
      { id: 21, name: 'Small Office (up to 500 sq ft)', price: 120, unit: 'per_cleaning' },
      { id: 22, name: 'Medium Office (500-1500 sq ft)', price: 220, unit: 'per_cleaning' },
      { id: 23, name: 'Large Office (1500+ sq ft)', price: 350, unit: 'per_cleaning' },
      { id: 24, name: 'One-time deep clean', price: 180, unit: 'per_cleaning' }
    ]
  },
  
  // Handyman & Repair Services
  {
    id: 5,
    name: "Handyman Services",
    category: "repair",
    description: "General handyman services including mounting, assembly, and minor repairs",
    basePrice: 75,
    priceType: "item",
    durationMinutes: 60,
    features: ["TV mounting", "Furniture assembly", "Minor repairs"],
    items: [
      { id: 9, name: 'TV Wall Mount', price: 75, unit: 'per_item' },
      { id: 10, name: 'Furniture Assembly', price: 50, unit: 'per_item' },
      { id: 11, name: 'Picture Hanging', price: 25, unit: 'per_item' },
      { id: 12, name: 'Minor Repairs', price: 60, unit: 'per_hour' }
    ]
  },
  {
    id: 6,
    name: "Plumbing Services",
    category: "repair",
    description: "Professional plumbing repairs and installations for residential properties",
    basePrice: 95,
    priceType: "item",
    durationMinutes: 90,
    features: ["Licensed plumbers", "Emergency service", "Parts included"],
    items: [
      { id: 25, name: 'Faucet Repair/Replacement', price: 95, unit: 'per_item' },
      { id: 26, name: 'Toilet Repair', price: 85, unit: 'per_item' },
      { id: 27, name: 'Garbage Disposal Installation', price: 120, unit: 'per_item' },
      { id: 28, name: 'Drain Cleaning', price: 110, unit: 'per_item' }
    ]
  },
  {
    id: 7,
    name: "Electrical Services",
    category: "repair",
    description: "Safe electrical repairs and installations by licensed electricians",
    basePrice: 120,
    priceType: "item",
    durationMinutes: 120,
    features: ["Licensed electricians", "Code compliant", "Warranty included"],
    items: [
      { id: 29, name: 'Light Fixture Installation', price: 120, unit: 'per_item' },
      { id: 30, name: 'Outlet Installation', price: 80, unit: 'per_item' },
      { id: 31, name: 'Ceiling Fan Installation', price: 150, unit: 'per_item' },
      { id: 32, name: 'Panel Upgrade', price: 400, unit: 'per_item' }
    ]
  },
  {
    id: 8,
    name: "Painting Services",
    category: "repair",
    description: "Interior and exterior painting with premium paints and professional finish",
    basePrice: 200,
    priceType: "rooms",
    durationMinutes: 480,
    features: ["Premium paints", "Color consultation", "Clean finish"],
    items: [
      { id: 33, name: 'Single Room Interior', price: 200, unit: 'per_room' },
      { id: 34, name: 'Bathroom/Kitchen', price: 300, unit: 'per_room' },
      { id: 35, name: 'Exterior Touch-up', price: 150, unit: 'per_section' },
      { id: 36, name: 'Full House Exterior', price: 800, unit: 'per_house' }
    ]
  },
  
  // Installation Services
  {
    id: 9,
    name: "Smart Home Installation",
    category: "installation",
    description: "Professional installation of smart home devices and automation systems",
    basePrice: 100,
    priceType: "item",
    durationMinutes: 90,
    features: ["Wi-Fi setup", "Smart devices", "App configuration"],
    items: [
      { id: 13, name: 'Smart Thermostat', price: 120, unit: 'per_item' },
      { id: 14, name: 'Security Camera Setup', price: 100, unit: 'per_camera' },
      { id: 15, name: 'Smart Lock Installation', price: 80, unit: 'per_item' },
      { id: 16, name: 'Whole Home Setup', price: 300, unit: 'per_home' }
    ]
  },
  {
    id: 10,
    name: "Appliance Installation",
    category: "installation",
    description: "Professional installation of home appliances with warranty and setup",
    basePrice: 150,
    priceType: "item",
    durationMinutes: 120,
    features: ["Warranty included", "Connection testing", "Cleanup included"],
    items: [
      { id: 37, name: 'Washer/Dryer Installation', price: 150, unit: 'per_set' },
      { id: 38, name: 'Dishwasher Installation', price: 120, unit: 'per_item' },
      { id: 39, name: 'Refrigerator Installation', price: 100, unit: 'per_item' },
      { id: 40, name: 'Over-Range Microwave', price: 130, unit: 'per_item' }
    ]
  },
  {
    id: 11,
    name: "Flooring Installation",
    category: "installation",
    description: "Professional flooring installation including vinyl, laminate, and hardwood",
    basePrice: 4.50,
    priceType: "sqft",
    durationMinutes: 360,
    features: ["Material sourcing", "Subfloor prep", "Finishing included"],
    items: [
      { id: 41, name: 'Vinyl Plank (per sq ft)', price: 4.50, unit: 'per_sqft' },
      { id: 42, name: 'Laminate (per sq ft)', price: 5.20, unit: 'per_sqft' },
      { id: 43, name: 'Hardwood (per sq ft)', price: 8.75, unit: 'per_sqft' },
      { id: 44, name: 'Tile (per sq ft)', price: 6.30, unit: 'per_sqft' }
    ]
  },
  
  // Maintenance Services
  {
    id: 12,
    name: "HVAC Maintenance",
    category: "maintenance",
    description: "Professional HVAC system maintenance and tune-ups for optimal performance",
    basePrice: 150,
    priceType: "item",
    durationMinutes: 120,
    features: ["Filter replacement", "System inspection", "Performance report"],
    items: [
      { id: 45, name: 'AC Tune-up', price: 150, unit: 'per_unit' },
      { id: 46, name: 'Heating System Check', price: 140, unit: 'per_unit' },
      { id: 47, name: 'Duct Cleaning', price: 200, unit: 'per_system' },
      { id: 48, name: 'Filter Replacement', price: 40, unit: 'per_filter' }
    ]
  },
  {
    id: 13,
    name: "Lawn Care",
    category: "maintenance",
    description: "Professional lawn maintenance including mowing, edging, and landscaping",
    basePrice: 60,
    priceType: "item",
    durationMinutes: 90,
    features: ["Mowing & edging", "Weed control", "Seasonal care"],
    items: [
      { id: 49, name: 'Standard Mowing (up to 5000 sq ft)', price: 60, unit: 'per_visit' },
      { id: 50, name: 'Large Lawn (5000+ sq ft)', price: 90, unit: 'per_visit' },
      { id: 51, name: 'Weed & Feed Treatment', price: 80, unit: 'per_treatment' },
      { id: 52, name: 'Seasonal Cleanup', price: 120, unit: 'per_season' }
    ]
  },
  {
    id: 14,
    name: "Gutter Services",
    category: "maintenance",
    description: "Gutter cleaning, repair, and maintenance to protect your home",
    basePrice: 120,
    priceType: "item",
    durationMinutes: 150,
    features: ["Debris removal", "Downspout check", "Damage inspection"],
    items: [
      { id: 53, name: 'Gutter Cleaning (single story)', price: 120, unit: 'per_home' },
      { id: 54, name: 'Gutter Cleaning (two story)', price: 180, unit: 'per_home' },
      { id: 55, name: 'Gutter Repair', price: 90, unit: 'per_repair' },
      { id: 56, name: 'Gutter Guard Installation', price: 8, unit: 'per_foot' }
    ]
  },
  
  // Moving Services
  {
    id: 15,
    name: "Moving Help",
    category: "moving",
    description: "Professional moving assistance for local and long-distance moves",
    basePrice: 90,
    priceType: "hourly",
    durationMinutes: 240,
    features: ["Trained movers", "Equipment included", "Damage protection"],
    items: [
      { id: 57, name: 'Local Moving (2 movers)', price: 90, unit: 'per_hour' },
      { id: 58, name: 'Local Moving (3 movers)', price: 130, unit: 'per_hour' },
      { id: 59, name: 'Packing Service', price: 40, unit: 'per_hour' },
      { id: 60, name: 'Heavy Item Moving', price: 150, unit: 'per_item' }
    ]
  },
  {
    id: 16,
    name: "Furniture Delivery",
    category: "moving",
    description: "Professional furniture delivery and assembly service with care",
    basePrice: 75,
    priceType: "item",
    durationMinutes: 120,
    features: ["White glove service", "Assembly included", "Debris removal"],
    items: [
      { id: 61, name: 'Small Furniture (chair, table)', price: 75, unit: 'per_item' },
      { id: 62, name: 'Large Furniture (sofa, dresser)', price: 120, unit: 'per_item' },
      { id: 63, name: 'Appliance Delivery', price: 100, unit: 'per_item' },
      { id: 64, name: 'Mattress Delivery', price: 60, unit: 'per_item' }
    ]
  }
];

const serviceIcons: Record<string, React.ReactElement> = {
  cleaning: (
    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M8 5v4m8-4v4"/>
    </svg>
  ),
  repair: (
    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  installation: (
    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  maintenance: (
    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.42-.243l-.228-2.284a1 1 0 00-.993-.876H9.394a1 1 0 00-.993.876l-.228 2.284a6 6 0 00-.42.243l-2.388.477a2 2 0 00-1.022.547l-.784.78a1 1 0 00-.187 1.181l1.263 2.127a1 1 0 001.075.495l2.372-.237a6 6 0 00.421.243l.228 2.284a1 1 0 00.993.876h1.566a1 1 0 00.993-.876l.228-2.284a6 6 0 00.421-.243l2.372.237a1 1 0 001.075-.495l1.263-2.127a1 1 0 00-.187-1.181l-.784-.78z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  moving: (
    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
    </svg>
  )
};

export default function Services() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'duration'>('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load cart from localStorage and simulate initial loading
  useEffect(() => {
    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem('serviceCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(mockServices.map(s => s.category)))];

  // Filter and sort services
  const filteredServices = useMemo(() => {
    const filtered = mockServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      const matchesPrice = service.basePrice >= priceRange[0] && service.basePrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.basePrice - b.basePrice;
        case 'duration':
          return a.durationMinutes - b.durationMinutes;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const getCategoryIcon = (category: string) => {
    return serviceIcons[category] || serviceIcons['repair'];
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const addToCart = (service: Service, selectedItems: SelectedServiceItem[]) => {
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newCartItem: CartItem = {
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      items: selectedItems,
      totalPrice
    };

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.serviceId === service.id);
      let updatedCart;
      if (existingIndex >= 0) {
        updatedCart = [...prev];
        updatedCart[existingIndex] = newCartItem;
      } else {
        updatedCart = [...prev, newCartItem];
      }
      
      // Persist to localStorage
      localStorage.setItem('serviceCart', JSON.stringify(updatedCart));
      
      return updatedCart;
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCart(prev => {
      const updatedCart = prev.filter(item => item.serviceId !== serviceId);
      // Persist to localStorage
      localStorage.setItem('serviceCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.items.reduce((itemSum, serviceItem) => itemSum + serviceItem.quantity, 0), 0);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional home services with transparent, flat-rate pricing. 
                Select multiple services and book them all at once.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
              {/* Mobile Filter Toggle */}
              <div className="w-full sm:hidden">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="h-5 w-5" />
                    Filters & Sort
                  </div>
                  <span className="text-xs text-gray-500">
                    {(searchQuery || selectedCategory !== 'all' || priceRange[1] !== 1000) ? 'Active' : ''}
                  </span>
                </button>
              </div>

              {/* Desktop Filters - Always Visible */}
              <div className="hidden sm:flex sm:flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 min-w-0 text-gray-900 bg-white"
                    style={{ 
                      borderColor: selectedCategory !== 'all' ? 'var(--primary)' : undefined
                    }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="text-gray-900">
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'duration')}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 min-w-0 text-gray-900 bg-white"
                  >
                    <option value="name" className="text-gray-900">Name</option>
                    <option value="price" className="text-gray-900">Price (Low to High)</option>
                    <option value="duration" className="text-gray-900">Duration (Short to Long)</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Price:</label>
                  <select
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 min-w-0 text-gray-900 bg-white"
                    style={{ 
                      borderColor: priceRange[1] !== 1000 ? 'var(--primary)' : undefined
                    }}
                  >
                    <option value={100} className="text-gray-900">Under $100</option>
                    <option value={200} className="text-gray-900">Under $200</option>
                    <option value={500} className="text-gray-900">Under $500</option>
                    <option value={1000} className="text-gray-900">Under $1000</option>
                  </select>
                </div>
              </div>

              {/* Mobile Filters - Collapsible */}
              {isFilterOpen && (
                <div className="w-full sm:hidden bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-900 bg-white"
                      style={{ 
                        borderColor: selectedCategory !== 'all' ? 'var(--primary)' : undefined
                      }}
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="text-gray-900">
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'duration')}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-900 bg-white"
                    >
                      <option value="name" className="text-gray-900">Name</option>
                      <option value="price" className="text-gray-900">Price (Low to High)</option>
                      <option value="duration" className="text-gray-900">Duration (Short to Long)</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                    <select
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-900 bg-white"
                      style={{ 
                        borderColor: priceRange[1] !== 1000 ? 'var(--primary)' : undefined
                      }}
                    >
                      <option value={100} className="text-gray-900">Under $100</option>
                      <option value={200} className="text-gray-900">Under $200</option>
                      <option value={500} className="text-gray-900">Under $500</option>
                      <option value={1000} className="text-gray-900">Under $1000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || priceRange[1] !== 1000) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredServices.length} of {mockServices.length} services
            </div>
          </div>

          {/* Services Grid */}
          {initialLoad ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingServiceCard key={index} />
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                }}
                className="btn-primary text-white px-4 py-2 rounded-md font-medium"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onAddToCart={addToCart}
                getCategoryIcon={getCategoryIcon}
                formatDuration={formatDuration}
                isInCart={cart.some(item => item.serviceId === service.id)}
              />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary - Fixed Bottom */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center gap-3 min-w-0 flex-1 mr-4"
                >
                  <div className="relative flex-shrink-0">
                    <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                    <span className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                      {getCartItemCount()}
                    </span>
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-medium text-gray-900 truncate">{cart.length} Service{cart.length !== 1 ? 's' : ''}</div>
                    <div className="text-sm text-gray-600">${getCartTotal().toFixed(2)} total</div>
                  </div>
                </button>

                <Link 
                  href="/book/cart"
                  className="btn-primary text-white px-4 sm:px-6 py-3 rounded-md font-medium flex items-center gap-2 flex-shrink-0"
                >
                  <span className="hidden sm:inline">Book Services</span>
                  <span className="sm:hidden">Book</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Slider */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setIsCartOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-xl max-h-[70vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Your Services</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4 pb-20">
              {cart.map((cartItem) => (
                <div key={cartItem.serviceId} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 pr-2 flex-1">{cartItem.serviceName}</h4>
                    <button
                      onClick={() => removeFromCart(cartItem.serviceId)}
                      className="text-red-500 hover:text-red-700 text-sm flex-shrink-0 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    {cartItem.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gray-600">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Service Total:</span>
                    <span>${cartItem.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Service Card Component
function ServiceCard({ 
  service, 
  onAddToCart, 
  getCategoryIcon, 
  formatDuration, 
  isInCart 
}: {
  service: Service;
  onAddToCart: (service: Service, selectedItems: SelectedServiceItem[]) => void;
  getCategoryIcon: (category: string) => React.ReactElement;
  formatDuration: (minutes: number) => string;
  isInCart: boolean;
}) {
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({});
  const [selectedRoomOption, setSelectedRoomOption] = useState<number | null>(null);

  const isRoomBased = service.priceType === 'rooms';
  const items = service.items || [];

  const handleQuantityChange = (itemId: number, change: number) => {
    setSelectedItems(prev => {
      const newQuantity = Math.max(0, (prev[itemId] || 0) + change);
      if (newQuantity === 0) {
        const { [itemId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleRoomSelection = (itemId: number) => {
    setSelectedRoomOption(itemId);
  };

  const getSelectedItemsForCart = () => {
    if (isRoomBased && selectedRoomOption) {
      const selectedItem = items.find(item => item.id === selectedRoomOption);
      return selectedItem ? [{
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: 1
      }] : [];
    }
    
    return Object.entries(selectedItems).map(([itemId, quantity]) => {
      const item = items.find(i => i.id === parseInt(itemId));
      return {
        id: parseInt(itemId),
        name: item?.name || '',
        price: item?.price || 0,
        quantity
      };
    });
  };

  const canAddToCart = () => {
    if (isRoomBased) {
      return selectedRoomOption !== null;
    }
    return Object.keys(selectedItems).length > 0;
  };

  const handleAddToCart = () => {
    if (canAddToCart()) {
      onAddToCart(service, getSelectedItemsForCart());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 hover:border-opacity-50 transition-colors" style={{ borderBottomColor: isInCart ? 'var(--primary)' : undefined }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {getCategoryIcon(service.category)}
            <div>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>{formatDuration(service.durationMinutes)}</span>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{service.category}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/services/${service.id}`}
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            Details
          </Link>
        </div>

        <p className="text-sm text-gray-600 mb-3">{service.description}</p>

        <div className="flex flex-wrap gap-1">
          {service.features.map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50"
              style={{ color: 'var(--primary)' }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Service Options */}
      <div className="p-4">
        {isRoomBased ? (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium text-gray-900">Select your home size:</h4>
            {items.map((item) => (
              <label key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`room-${service.id}`}
                    value={item.id}
                    onChange={() => handleRoomSelection(item.id)}
                    className="h-4 w-4"
                    style={{ color: 'var(--primary)' }}
                  />
                  <span className="text-sm text-gray-900">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">${item.price}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            <h4 className="text-sm font-medium text-gray-900">Add services:</h4>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">${item.price}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={!selectedItems[item.id]}
                    className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                  >
                    <MinusIcon className="h-3 w-3" />
                  </button>
                  
                  <span className="w-6 text-center text-sm font-medium text-gray-900">
                    {selectedItems[item.id] || 0}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-700"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart()}
          className={`
            w-full py-2 px-4 rounded-md font-medium text-sm transition-colors
            ${canAddToCart() && !isInCart
              ? 'btn-primary text-white' 
              : isInCart
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isInCart ? (
            <div className="flex items-center justify-center gap-1">
              <CheckCircleIcon className="h-4 w-4" />
              Added to Cart
            </div>
          ) : canAddToCart() ? (
            'Add to Cart'
          ) : (
            isRoomBased ? 'Select home size' : 'Select services'
          )}
        </button>
      </div>
    </div>
  );
}