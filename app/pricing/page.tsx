'use client';

import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon, StarIcon } from '@heroicons/react/24/outline';

const pricingTiers = [
  {
    name: 'Basic Service',
    id: 'basic',
    href: '/services',
    priceMonthly: 'Per visit',
    description: 'Individual service bookings with standard rates',
    features: [
      'Book individual services',
      'Standard pricing',
      'Basic customer support',
      '24-hour cancellation',
      'Service guarantee'
    ],
    mostPopular: false,
  },
  {
    name: 'Service Package',
    id: 'package',
    href: '/services',
    priceMonthly: 'Save 15%',
    description: 'Bundle multiple services together for better value',
    features: [
      'Bundle 3+ services',
      '15% discount on bundled services',
      'Priority booking',
      'Flexible scheduling',
      'Dedicated coordinator',
      'Extended warranty'
    ],
    mostPopular: true,
  },
  {
    name: 'Subscription',
    id: 'subscription',
    href: '/contact',
    priceMonthly: 'Custom',
    description: 'Regular service subscriptions for ongoing maintenance',
    features: [
      'Regular scheduled services',
      'Up to 25% savings',
      'Priority technician assignment',
      'Flexible scheduling',
      '48-hour emergency response',
      'Account manager',
      'Custom service plans'
    ],
    mostPopular: false,
  },
]

const serviceCategories = [
  {
    name: 'Cleaning Services',
    basePrice: 80,
    description: 'Professional house cleaning',
    services: [
      { name: 'Studio/1BR', price: 80 },
      { name: '2 Bedroom', price: 120 },
      { name: '3 Bedroom', price: 160 },
      { name: '4+ Bedroom', price: 200 }
    ]
  },
  {
    name: 'Handyman Services',
    basePrice: 75,
    description: 'General repairs and maintenance',
    services: [
      { name: 'TV Wall Mount', price: 75 },
      { name: 'Furniture Assembly', price: 50 },
      { name: 'Picture Hanging', price: 25 },
      { name: 'Minor Repairs', price: 60, unit: '/hour' }
    ]
  },
  {
    name: 'Installation Services',
    basePrice: 100,
    description: 'Professional equipment installation',
    services: [
      { name: 'Wi-Fi Router Setup', price: 50 },
      { name: 'Smart Thermostat', price: 120 },
      { name: 'Ceiling Fan', price: 150 },
      { name: 'Security Camera', price: 100 }
    ]
  }
];

export default function Pricing() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7" style={{ color: 'var(--primary)' }}>Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Transparent, fair pricing for all services
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          No hidden fees, no surprises. Get quality home services at competitive rates with flexible payment options.
        </p>
      </div>

      {/* Pricing tiers */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 relative"
              style={tier.mostPopular ? { borderColor: 'var(--primary)', borderWidth: '2px' } : {}}
            >
              {tier.mostPopular ? (
                <div className="absolute top-4 right-4">
                  <p className="rounded-full px-3 py-1.5 text-xs font-semibold leading-5" style={{ backgroundColor: 'rgba(10, 31, 68, 0.1)', color: 'var(--primary)' }}>
                    Most popular
                  </p>
                </div>
              ) : null}
              <div>
                <div>
                  <h3
                    id={tier.id}
                    className="text-xl font-semibold leading-8 text-gray-900"
                    style={tier.mostPopular ? { color: 'var(--primary)' } : {}}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.mostPopular
                    ? 'btn-primary text-white'
                    : 'border-2 hover:bg-gray-50 transition-colors'
                }`}
                style={!tier.mostPopular ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : {}}
              >
                {tier.name === 'Subscription' ? 'Contact Sales' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Service pricing details */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Service Pricing Details
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Clear, upfront pricing for all our services. No hidden costs or surprise charges.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {serviceCategories.map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                  <p className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">From ${category.basePrice}</span>
                  </p>
                </div>
                
                <ul role="list" className="mt-8 space-y-3">
                  {category.services.map((service, serviceIdx) => (
                    <li key={serviceIdx} className="flex justify-between">
                      <span className="text-sm text-gray-600">{service.name}</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${service.price}{service.unit || ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Pricing FAQ
          </h2>
          
          <div className="space-y-8">
            {[
              {
                question: "Are there any hidden fees?",
                answer: "No hidden fees ever. The price you see is the price you pay. We believe in complete transparency."
              },
              {
                question: "Do you charge for travel time?",
                answer: "No travel fees within our standard service areas. For locations outside our standard zones, any travel charges will be clearly communicated upfront."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, PayPal, and bank transfers. Payment is processed securely after service completion."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with the service, we'll make it right or provide a full refund."
              },
              {
                question: "Do prices vary by location?",
                answer: "Our base prices are consistent across all service areas. However, services in high-cost areas may have small regional adjustments that will be shown upfront."
              },
              {
                question: "Are there discounts for multiple services?",
                answer: "Yes! Bundle 3 or more services for a 15% discount. Subscription customers can save up to 25% with regular service schedules."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div style={{ backgroundColor: 'var(--primary)' }}>
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Book your first service today and experience the difference professional service makes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                View Services
              </Link>
              <Link href="/requests/new" className="text-sm font-semibold leading-6 text-white">
                Submit Request <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}