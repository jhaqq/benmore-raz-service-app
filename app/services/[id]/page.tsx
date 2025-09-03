'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, ShieldCheckIcon, StarIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  basePrice: number;
  priceType: string;
  durationMinutes: number;
  features: string[];
  includes: string[];
  process: string[];
  items?: ServiceItem[];
}

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
}

const mockServices: Service[] = [
  // Cleaning Services
  {
    id: 1,
    name: "House Cleaning",
    category: "cleaning",
    description: "Professional house cleaning service with flat-rate pricing based on number of bedrooms",
    longDescription: "Our professional house cleaning service provides thorough, reliable cleaning for your home. We use eco-friendly products and follow a comprehensive checklist to ensure every room is spotless. Our trained and insured cleaners will leave your home fresh and welcoming.",
    basePrice: 80,
    priceType: "rooms",
    durationMinutes: 120,
    features: ["Deep cleaning", "Eco-friendly products", "Insured cleaners", "Background-checked staff"],
    includes: [
      "Dusting all surfaces and furniture",
      "Vacuuming carpets and mopping floors", 
      "Kitchen cleaning (counters, appliances, sink)",
      "Bathroom cleaning (toilet, shower, sink, mirror)",
      "Bed making and basic tidying",
      "Trash removal"
    ],
    process: [
      "Initial walkthrough and assessment",
      "Room-by-room deep cleaning", 
      "Quality check and final inspection",
      "Client walkthrough and feedback"
    ],
    items: [
      { id: 1, name: 'Studio/1 Bedroom', description: 'Perfect for apartments and small spaces', price: 80, unit: 'per_cleaning' },
      { id: 2, name: '2 Bedrooms', description: 'Ideal for small families and couples', price: 120, unit: 'per_cleaning' },
      { id: 3, name: '3 Bedrooms', description: 'Great for growing families', price: 160, unit: 'per_cleaning' },
      { id: 4, name: '4+ Bedrooms', description: 'For large homes and families', price: 200, unit: 'per_cleaning' }
    ]
  },
  {
    id: 2,
    name: "Deep Cleaning",
    category: "cleaning",
    description: "Comprehensive deep cleaning for move-in/move-out or seasonal cleaning",
    longDescription: "Our deep cleaning service goes beyond regular cleaning to tackle built-up dirt, grime, and neglected areas. Perfect for move-in/move-out situations, seasonal cleaning, or when your home needs extra attention.",
    basePrice: 150,
    priceType: "rooms",
    durationMinutes: 240,
    features: ["Move-in/out ready", "All surfaces", "Detailed work", "Inside appliances"],
    includes: [
      "Everything in regular cleaning plus:",
      "Inside oven, refrigerator, and microwave",
      "Baseboard and window sill cleaning",
      "Light fixture and ceiling fan cleaning",
      "Cabinet fronts and inside drawers",
      "Detailed bathroom tile and grout cleaning"
    ],
    process: [
      "Detailed assessment and planning",
      "Deep cleaning of all surfaces",
      "Appliance interior cleaning", 
      "Final inspection and touch-ups"
    ],
    items: [
      { id: 5, name: 'Studio/1 Bedroom Deep Clean', description: 'Comprehensive deep clean for small spaces', price: 150, unit: 'per_cleaning' },
      { id: 6, name: '2 Bedrooms Deep Clean', description: 'Thorough deep cleaning for medium homes', price: 220, unit: 'per_cleaning' },
      { id: 7, name: '3 Bedrooms Deep Clean', description: 'Complete deep cleaning for family homes', price: 290, unit: 'per_cleaning' },
      { id: 8, name: '4+ Bedrooms Deep Clean', description: 'Full deep cleaning for large properties', price: 360, unit: 'per_cleaning' }
    ]
  },
  {
    id: 3,
    name: "Post-Construction Cleanup",
    category: "cleaning",
    description: "Specialized cleaning after renovations, construction, or major repairs",
    longDescription: "Our post-construction cleanup service handles the mess left behind after renovation or construction work. We remove dust, debris, and construction residue to make your space move-in ready.",
    basePrice: 200,
    priceType: "rooms",
    durationMinutes: 360,
    features: ["Dust removal", "Debris cleanup", "Surface restoration", "Construction residue removal"],
    includes: [
      "Complete dust and debris removal",
      "Window and surface cleaning",
      "Floor cleaning and restoration",
      "Light fixture and fan cleaning",
      "Cabinet and appliance cleaning",
      "Final walkthrough and touch-ups"
    ],
    process: [
      "Site assessment and safety check",
      "Debris removal and disposal",
      "Deep surface cleaning and restoration",
      "Final inspection and client approval"
    ],
    items: [
      { id: 17, name: 'Single Room', description: 'Post-construction cleanup for one room', price: 200, unit: 'per_room' },
      { id: 18, name: 'Full Apartment', description: 'Complete apartment post-construction cleanup', price: 400, unit: 'per_cleaning' },
      { id: 19, name: 'Full House', description: 'Whole house post-construction cleanup', price: 600, unit: 'per_cleaning' },
      { id: 20, name: 'Commercial Space', description: 'Commercial post-construction cleanup', price: 800, unit: 'per_cleaning' }
    ]
  },
  {
    id: 4,
    name: "Office Cleaning",
    category: "cleaning",
    description: "Professional commercial cleaning for offices and workspaces",
    longDescription: "Keep your workplace clean and professional with our commercial office cleaning services. We provide flexible scheduling and comprehensive cleaning tailored to your business needs.",
    basePrice: 120,
    priceType: "item",
    durationMinutes: 180,
    features: ["Sanitization", "Flexible scheduling", "Bonded staff", "Commercial grade supplies"],
    includes: [
      "Desk and surface sanitization",
      "Floor vacuuming and mopping",
      "Restroom cleaning and restocking",
      "Trash removal and recycling",
      "Kitchen/break room cleaning",
      "Window and mirror cleaning"
    ],
    process: [
      "Initial consultation and assessment",
      "Customized cleaning plan development",
      "Regular scheduled cleaning service",
      "Quality assurance and feedback"
    ],
    items: [
      { id: 21, name: 'Small Office (up to 500 sq ft)', description: 'Perfect for small businesses', price: 120, unit: 'per_cleaning' },
      { id: 22, name: 'Medium Office (500-1500 sq ft)', description: 'Ideal for growing companies', price: 220, unit: 'per_cleaning' },
      { id: 23, name: 'Large Office (1500+ sq ft)', description: 'Comprehensive cleaning for large offices', price: 350, unit: 'per_cleaning' },
      { id: 24, name: 'One-time deep clean', description: 'Deep cleaning service for special occasions', price: 180, unit: 'per_cleaning' }
    ]
  },

  // Handyman & Repair Services
  {
    id: 5,
    name: "Handyman Services",
    category: "repair",
    description: "General handyman services including mounting, assembly, and minor repairs",
    longDescription: "Our skilled handymen can tackle a wide variety of home improvement and repair tasks. From mounting TVs and assembling furniture to minor repairs and installations, we bring the tools and expertise needed.",
    basePrice: 75,
    priceType: "item",
    durationMinutes: 60,
    features: ["TV mounting", "Furniture assembly", "Minor repairs", "Tools included"],
    includes: [
      "Professional assessment of the task",
      "All necessary tools and hardware",
      "Clean-up after work completion",
      "Work guarantee and insurance coverage",
      "Safety checks and final testing"
    ],
    process: [
      "Task assessment and planning",
      "Setup and preparation",
      "Professional installation/repair",
      "Testing and quality assurance"
    ],
    items: [
      { id: 9, name: 'TV Wall Mount', description: 'Professional TV mounting on any wall type', price: 75, unit: 'per_item' },
      { id: 10, name: 'Furniture Assembly', description: 'Assembly of furniture items', price: 50, unit: 'per_item' },
      { id: 11, name: 'Picture Hanging', description: 'Professional hanging of artwork', price: 25, unit: 'per_item' },
      { id: 12, name: 'Minor Repairs', description: 'Small household repairs', price: 60, unit: 'per_hour' }
    ]
  },
  {
    id: 6,
    name: "Plumbing Services", 
    category: "repair",
    description: "Professional plumbing repairs and installations for residential properties",
    longDescription: "Our licensed plumbers handle all your residential plumbing needs with professional expertise and quality parts. From simple repairs to installations, we ensure reliable and long-lasting solutions.",
    basePrice: 95,
    priceType: "item",
    durationMinutes: 90,
    features: ["Licensed plumbers", "Emergency service", "Parts included", "Warranty provided"],
    includes: [
      "Professional plumbing assessment",
      "Quality parts and materials",
      "Code-compliant installation",
      "System testing and inspection",
      "Clean-up and debris removal",
      "Service warranty and support"
    ],
    process: [
      "Problem diagnosis and assessment",
      "Solution recommendation and quote",
      "Professional repair or installation",
      "System testing and final inspection"
    ],
    items: [
      { id: 25, name: 'Faucet Repair/Replacement', description: 'Fix or replace kitchen and bathroom faucets', price: 95, unit: 'per_item' },
      { id: 26, name: 'Toilet Repair', description: 'Fix running, clogged, or broken toilets', price: 85, unit: 'per_item' },
      { id: 27, name: 'Garbage Disposal Installation', description: 'Install new garbage disposal unit', price: 120, unit: 'per_item' },
      { id: 28, name: 'Drain Cleaning', description: 'Clear clogged drains and pipes', price: 110, unit: 'per_item' }
    ]
  },
  {
    id: 7,
    name: "Electrical Services",
    category: "repair", 
    description: "Safe electrical repairs and installations by licensed electricians",
    longDescription: "Our licensed electricians provide safe and reliable electrical services for your home. All work is performed to code standards with proper permits and warranties for your peace of mind.",
    basePrice: 120,
    priceType: "item",
    durationMinutes: 120,
    features: ["Licensed electricians", "Code compliant", "Warranty included", "Permit handling"],
    includes: [
      "Electrical system assessment",
      "Code-compliant installation",
      "Quality electrical materials",
      "Safety testing and inspection",
      "Permit handling (if required)",
      "Work warranty and documentation"
    ],
    process: [
      "Electrical assessment and planning",
      "Permit acquisition (if needed)",
      "Professional installation/repair",
      "Code inspection and testing"
    ],
    items: [
      { id: 29, name: 'Light Fixture Installation', description: 'Install ceiling lights, chandeliers, and fixtures', price: 120, unit: 'per_item' },
      { id: 30, name: 'Outlet Installation', description: 'Add new electrical outlets', price: 80, unit: 'per_item' },
      { id: 31, name: 'Ceiling Fan Installation', description: 'Install ceiling fans with wiring', price: 150, unit: 'per_item' },
      { id: 32, name: 'Panel Upgrade', description: 'Electrical panel upgrade and modernization', price: 400, unit: 'per_item' }
    ]
  },
  {
    id: 8,
    name: "Painting Services",
    category: "repair",
    description: "Interior and exterior painting with premium paints and professional finish",
    longDescription: "Transform your space with our professional painting services. We use premium paints and provide expert color consultation to achieve the perfect look for your home or office.",
    basePrice: 200,
    priceType: "rooms", 
    durationMinutes: 480,
    features: ["Premium paints", "Color consultation", "Clean finish", "Surface preparation"],
    includes: [
      "Surface preparation and priming",
      "Premium quality paints",
      "Professional application techniques",
      "Clean-up and debris removal",
      "Color consultation service",
      "Touch-up warranty"
    ],
    process: [
      "Color consultation and planning",
      "Surface preparation and priming",
      "Professional paint application",
      "Final inspection and touch-ups"
    ],
    items: [
      { id: 33, name: 'Single Room Interior', description: 'Complete interior room painting', price: 200, unit: 'per_room' },
      { id: 34, name: 'Bathroom/Kitchen', description: 'Specialized painting for high-moisture areas', price: 300, unit: 'per_room' },
      { id: 35, name: 'Exterior Touch-up', description: 'Exterior paint touch-ups and repairs', price: 150, unit: 'per_section' },
      { id: 36, name: 'Full House Exterior', description: 'Complete exterior house painting', price: 800, unit: 'per_house' }
    ]
  },

  // Installation Services
  {
    id: 9,
    name: "Smart Home Installation",
    category: "installation",
    description: "Professional installation of smart home devices and automation systems", 
    longDescription: "Upgrade your home with smart technology professionally installed and configured. Our technicians ensure all devices work seamlessly together and provide training on how to use your new smart home system.",
    basePrice: 100,
    priceType: "item",
    durationMinutes: 90,
    features: ["Wi-Fi setup", "Smart devices", "App configuration", "Integration testing"],
    includes: [
      "Device installation and setup",
      "Wi-Fi network configuration",
      "Mobile app setup and training",
      "Device integration and testing",
      "User training and documentation",
      "30-day support and troubleshooting"
    ],
    process: [
      "Home assessment and planning",
      "Device installation and configuration",
      "System integration and testing",
      "User training and documentation"
    ],
    items: [
      { id: 13, name: 'Smart Thermostat', description: 'Install and program smart thermostat', price: 120, unit: 'per_item' },
      { id: 14, name: 'Security Camera Setup', description: 'Install and configure security cameras', price: 100, unit: 'per_camera' },
      { id: 15, name: 'Smart Lock Installation', description: 'Install smart door locks', price: 80, unit: 'per_item' },
      { id: 16, name: 'Whole Home Setup', description: 'Complete smart home system setup', price: 300, unit: 'per_home' }
    ]
  },
  {
    id: 10,
    name: "Appliance Installation",
    category: "installation",
    description: "Professional installation of home appliances with warranty and setup",
    longDescription: "Our certified technicians provide professional appliance installation with proper connections, testing, and warranty preservation. We ensure your appliances are installed safely and correctly.",
    basePrice: 150,
    priceType: "item",
    durationMinutes: 120,
    features: ["Warranty included", "Connection testing", "Cleanup included", "Safety inspection"],
    includes: [
      "Professional appliance installation",
      "Electrical and plumbing connections",
      "System testing and inspection",
      "Warranty documentation",
      "User demonstration and training",
      "Packaging removal and cleanup"
    ],
    process: [
      "Site preparation and assessment",
      "Professional installation and connections",
      "Testing and safety inspection",
      "User training and documentation"
    ],
    items: [
      { id: 37, name: 'Washer/Dryer Installation', description: 'Install washer and dryer set', price: 150, unit: 'per_set' },
      { id: 38, name: 'Dishwasher Installation', description: 'Install built-in dishwasher', price: 120, unit: 'per_item' },
      { id: 39, name: 'Refrigerator Installation', description: 'Install and connect refrigerator', price: 100, unit: 'per_item' },
      { id: 40, name: 'Over-Range Microwave', description: 'Install over-range microwave unit', price: 130, unit: 'per_item' }
    ]
  },
  {
    id: 11,
    name: "Flooring Installation",
    category: "installation",
    description: "Professional flooring installation including vinyl, laminate, and hardwood",
    longDescription: "Transform your floors with our professional flooring installation services. We handle everything from subfloor preparation to final finishing, ensuring beautiful and long-lasting results.",
    basePrice: 4.50,
    priceType: "sqft",
    durationMinutes: 360,
    features: ["Material sourcing", "Subfloor prep", "Finishing included", "Warranty provided"],
    includes: [
      "Subfloor preparation and leveling",
      "Professional material installation",
      "Trim and molding installation",
      "Quality finishing and sealing",
      "Clean-up and debris removal",
      "Installation warranty"
    ],
    process: [
      "Floor assessment and measurement",
      "Subfloor preparation and repair",
      "Professional flooring installation",
      "Finishing and final inspection"
    ],
    items: [
      { id: 41, name: 'Vinyl Plank (per sq ft)', description: 'Durable and water-resistant vinyl plank flooring', price: 4.50, unit: 'per_sqft' },
      { id: 42, name: 'Laminate (per sq ft)', description: 'High-quality laminate flooring installation', price: 5.20, unit: 'per_sqft' },
      { id: 43, name: 'Hardwood (per sq ft)', description: 'Premium hardwood flooring installation', price: 8.75, unit: 'per_sqft' },
      { id: 44, name: 'Tile (per sq ft)', description: 'Ceramic and porcelain tile installation', price: 6.30, unit: 'per_sqft' }
    ]
  },

  // Maintenance Services
  {
    id: 12,
    name: "HVAC Maintenance", 
    category: "maintenance",
    description: "Professional HVAC system maintenance and tune-ups for optimal performance",
    longDescription: "Keep your heating and cooling systems running efficiently with our comprehensive HVAC maintenance services. Regular maintenance extends equipment life and reduces energy costs.",
    basePrice: 150,
    priceType: "item",
    durationMinutes: 120,
    features: ["Filter replacement", "System inspection", "Performance report", "Energy optimization"],
    includes: [
      "Complete system inspection",
      "Filter replacement and cleaning",
      "Performance testing and calibration",
      "Energy efficiency assessment",
      "Detailed maintenance report",
      "Seasonal maintenance recommendations"
    ],
    process: [
      "System assessment and inspection",
      "Component cleaning and maintenance",
      "Performance testing and calibration",
      "Report and recommendations"
    ],
    items: [
      { id: 45, name: 'AC Tune-up', description: 'Complete air conditioning system maintenance', price: 150, unit: 'per_unit' },
      { id: 46, name: 'Heating System Check', description: 'Comprehensive heating system inspection', price: 140, unit: 'per_unit' },
      { id: 47, name: 'Duct Cleaning', description: 'Air duct cleaning and sanitization', price: 200, unit: 'per_system' },
      { id: 48, name: 'Filter Replacement', description: 'HVAC filter replacement service', price: 40, unit: 'per_filter' }
    ]
  },
  {
    id: 13,
    name: "Lawn Care",
    category: "maintenance",
    description: "Professional lawn maintenance including mowing, edging, and landscaping",
    longDescription: "Maintain a beautiful and healthy lawn with our professional lawn care services. We provide regular maintenance and seasonal treatments to keep your outdoor space looking its best.",
    basePrice: 60,
    priceType: "item",
    durationMinutes: 90,
    features: ["Mowing & edging", "Weed control", "Seasonal care", "Equipment included"],
    includes: [
      "Professional grass mowing",
      "Edge trimming and cleanup",
      "Weed identification and treatment",
      "Seasonal lawn care advice",
      "Equipment and supplies included",
      "Debris removal and cleanup"
    ],
    process: [
      "Lawn assessment and planning",
      "Professional mowing and edging",
      "Weed treatment and care",
      "Final cleanup and inspection"
    ],
    items: [
      { id: 49, name: 'Standard Mowing (up to 5000 sq ft)', description: 'Regular lawn mowing and edging', price: 60, unit: 'per_visit' },
      { id: 50, name: 'Large Lawn (5000+ sq ft)', description: 'Mowing service for large properties', price: 90, unit: 'per_visit' },
      { id: 51, name: 'Weed & Feed Treatment', description: 'Weed control and lawn fertilization', price: 80, unit: 'per_treatment' },
      { id: 52, name: 'Seasonal Cleanup', description: 'Spring or fall lawn cleanup service', price: 120, unit: 'per_season' }
    ]
  },
  {
    id: 14,
    name: "Gutter Services",
    category: "maintenance",
    description: "Gutter cleaning, repair, and maintenance to protect your home",
    longDescription: "Protect your home's foundation and structure with our comprehensive gutter services. We clean, repair, and maintain gutters to ensure proper water drainage year-round.",
    basePrice: 120,
    priceType: "item", 
    durationMinutes: 150,
    features: ["Debris removal", "Downspout check", "Damage inspection", "Safety equipment"],
    includes: [
      "Complete debris removal",
      "Downspout cleaning and testing",
      "Gutter and fascia inspection",
      "Minor repair and adjustment",
      "Water flow testing",
      "Cleanup and debris disposal"
    ],
    process: [
      "Safety setup and inspection",
      "Debris removal and cleaning",
      "System testing and repairs",
      "Final inspection and cleanup"
    ],
    items: [
      { id: 53, name: 'Gutter Cleaning (single story)', description: 'Complete gutter cleaning for one-story homes', price: 120, unit: 'per_home' },
      { id: 54, name: 'Gutter Cleaning (two story)', description: 'Gutter cleaning for two-story homes', price: 180, unit: 'per_home' },
      { id: 55, name: 'Gutter Repair', description: 'Gutter repair and maintenance', price: 90, unit: 'per_repair' },
      { id: 56, name: 'Gutter Guard Installation', description: 'Install gutter guards for protection', price: 8, unit: 'per_foot' }
    ]
  },

  // Moving Services
  {
    id: 15,
    name: "Moving Help",
    category: "moving",
    description: "Professional moving assistance for local and long-distance moves",
    longDescription: "Make your move stress-free with our professional moving assistance. Our trained movers handle your belongings with care and provide efficient, reliable moving services.",
    basePrice: 90,
    priceType: "hourly",
    durationMinutes: 240,
    features: ["Trained movers", "Equipment included", "Damage protection", "Flexible scheduling"],
    includes: [
      "Professional packing and wrapping",
      "Loading and unloading assistance",
      "Moving equipment and supplies",
      "Basic damage protection",
      "Assembly and disassembly help",
      "Clean-up after move"
    ],
    process: [
      "Move assessment and planning",
      "Professional packing and loading",
      "Safe transportation assistance",
      "Unloading and setup help"
    ],
    items: [
      { id: 57, name: 'Local Moving (2 movers)', description: 'Two professional movers for local moves', price: 90, unit: 'per_hour' },
      { id: 58, name: 'Local Moving (3 movers)', description: 'Three professional movers for larger moves', price: 130, unit: 'per_hour' },
      { id: 59, name: 'Packing Service', description: 'Professional packing and wrapping service', price: 40, unit: 'per_hour' },
      { id: 60, name: 'Heavy Item Moving', description: 'Specialized moving for heavy items', price: 150, unit: 'per_item' }
    ]
  },
  {
    id: 16,
    name: "Furniture Delivery",
    category: "moving",
    description: "Professional furniture delivery and assembly service with care",
    longDescription: "Professional furniture delivery service with white-glove care. We handle everything from delivery to assembly, ensuring your new furniture is set up perfectly in your home.",
    basePrice: 75,
    priceType: "item",
    durationMinutes: 120,
    features: ["White glove service", "Assembly included", "Debris removal", "Damage protection"],
    includes: [
      "Careful furniture transportation",
      "Professional assembly service", 
      "Placement in desired location",
      "Packaging removal and cleanup",
      "Basic damage protection",
      "Assembly verification and testing"
    ],
    process: [
      "Delivery coordination and planning",
      "Careful transportation and handling",
      "Professional assembly and setup",
      "Final placement and cleanup"
    ],
    items: [
      { id: 61, name: 'Small Furniture (chair, table)', description: 'Delivery and assembly of small furniture', price: 75, unit: 'per_item' },
      { id: 62, name: 'Large Furniture (sofa, dresser)', description: 'Delivery of large furniture items', price: 120, unit: 'per_item' },
      { id: 63, name: 'Appliance Delivery', description: 'Appliance delivery and basic setup', price: 100, unit: 'per_item' },
      { id: 64, name: 'Mattress Delivery', description: 'Mattress delivery and setup', price: 60, unit: 'per_item' }
    ]
  }
];

const serviceIcons: Record<string, React.ReactElement> = {
  cleaning: (
    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M8 5v4m8-4v4"/>
    </svg>
  ),
  repair: (
    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  installation: (
    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  maintenance: (
    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.42-.243l-.228-2.284a1 1 0 00-.993-.876H9.394a1 1 0 00-.993.876l-.228 2.284a6 6 0 00-.42.243l-2.388.477a2 2 0 00-1.022.547l-.784.78a1 1 0 00-.187 1.181l1.263 2.127a1 1 0 001.075.495l2.372-.237a6 6 0 00.421.243l.228 2.284a1 1 0 00.993.876h1.566a1 1 0 00.993-.876l.228-2.284a6 6 0 00.421-.243l2.372.237a1 1 0 001.075-.495l1.263-2.127a1 1 0 00-.187-1.181l-.784-.78z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  moving: (
    <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/>
    </svg>
  )
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = parseInt(params.id as string);
  const [service, setService] = useState<Service | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({});
  const [selectedRoomOption, setSelectedRoomOption] = useState<number | null>(null);

  useEffect(() => {
    const foundService = mockServices.find(s => s.id === serviceId);
    setService(foundService || null);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

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

  const calculateTotal = () => {
    if (isRoomBased && selectedRoomOption) {
      const selectedItem = items.find(item => item.id === selectedRoomOption);
      return selectedItem?.price || 0;
    }
    
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = items.find(i => i.id === parseInt(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/services"
              className="text-gray-500 hover:text-gray-700 p-2 -ml-2 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-4">
              {getCategoryIcon(service.category)}
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">{service.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{formatDuration(service.durationMinutes)} typical</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheckIcon className="h-4 w-4" />
                    <span>Insured & Vetted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{service.longDescription}</p>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Our Process</h3>
                <div className="space-y-3">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isRoomBased ? 'Select Your Home Size' : 'Choose Services'}
                </h3>

                {isRoomBased ? (
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-all
                          ${selectedRoomOption === item.id 
                            ? 'border-primary bg-gray-50 ring-1 ring-blue-600' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                        onClick={() => handleRoomSelection(item.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${selectedRoomOption === item.id ? 'border-primary bg-primary' : 'border-gray-300'}
                            `}>
                              {selectedRoomOption === item.id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            ${item.price}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-8">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                            <div className="text-lg font-semibold text-gray-900 mt-1">
                              ${item.price} {item.unit.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={!selectedItems[item.id]}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            
                            <span className="w-8 text-center font-medium">
                              {selectedItems[item.id] || 0}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-2xl font-semibold text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Link
                  href="/services"
                  className="block w-full py-3 px-6 rounded-md font-medium text-center transition-all btn-primary text-white"
                >
                  Book This Service
                </Link>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Free cancellation up to 24 hours before appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}