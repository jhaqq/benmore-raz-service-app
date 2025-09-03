'use client';

import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  PhoneIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    number: '01',
    title: 'Submit Your Request',
    description: 'Tell us what you need with our simple request form. Include photos, preferred timing, and any special instructions.',
    icon: DocumentTextIcon,
    details: [
      'Describe your service needs in detail',
      'Upload photos to help us understand the scope',
      'Set your preferred date and time',
      'Add special instructions or access details'
    ]
  },
  {
    number: '02',
    title: 'Get Matched with a Pro',
    description: 'We review your request and match you with a qualified technician in your area who specializes in your type of service.',
    icon: UserGroupIcon,
    details: [
      'All technicians are background checked',
      'Matched based on location and specialty',
      'Licensed and insured professionals',
      'Reviewed for quality and reliability'
    ]
  },
  {
    number: '03',
    title: 'Schedule & Confirm',
    description: 'Your assigned technician will contact you to confirm details and schedule the service at a time that works for you.',
    icon: ClockIcon,
    details: [
      'Direct communication with your technician',
      'Flexible scheduling options',
      'Transparent pricing upfront',
      'Real-time updates and notifications'
    ]
  },
  {
    number: '04',
    title: 'Quality Service Delivered',
    description: 'Your technician arrives on time with the right tools and expertise to complete your service professionally.',
    icon: CheckCircleIcon,
    details: [
      'Professional service guaranteed',
      'All work backed by our warranty',
      'Secure payment processing',
      'Rate and review your experience'
    ]
  }
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Trusted Professionals',
    description: 'All technicians are thoroughly vetted, background checked, licensed, and insured for your peace of mind.'
  },
  {
    icon: ClockIcon,
    title: 'Flexible Scheduling',
    description: 'Book services when it works for you. Morning, afternoon, evening, or weekend appointments available.'
  },
  {
    icon: CreditCardIcon,
    title: 'Transparent Pricing',
    description: 'Get upfront pricing before work begins. No hidden fees or surprise charges.'
  },
  {
    icon: PhoneIcon,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to help with any questions or concerns.'
  },
  {
    icon: StarIcon,
    title: 'Quality Guaranteed',
    description: 'All work is backed by our satisfaction guarantee. Not happy? We\'ll make it right.'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Real-time Updates',
    description: 'Stay informed with live updates about your service request status and technician arrival.'
  }
];

const serviceCategories = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'Home Repairs',
    services: ['Plumbing', 'Electrical', 'HVAC', 'Appliance Repair']
  },
  {
    icon: HomeIcon,
    title: 'Home Improvement',
    services: ['Painting', 'Flooring', 'Carpentry', 'Tile Work']
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Maintenance',
    services: ['Deep Cleaning', 'Pressure Washing', 'Gutter Cleaning', 'Lawn Care']
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Getting professional home services has never been easier. 
            Here's how we connect you with trusted local technicians in just a few simple steps.
          </p>
          <Link
            href="/requests/new"
            className="btn-primary text-white px-8 py-3 rounded-md text-lg font-medium inline-flex items-center gap-2"
          >
            Get Started Now
            <DocumentTextIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Process, Professional Results
            </h2>
            <p className="text-lg text-gray-600">
              From request to completion in four easy steps
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-3">
                        <CheckCircleIcon className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gray-50 rounded-2xl flex items-center justify-center">
                    <step.icon className="h-16 w-16 lg:h-24 lg:w-24" style={{ color: 'var(--primary)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600">
              We've built our service around what matters most to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(10, 31, 68, 0.1)' }}>
                  <feature.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services We Offer
            </h2>
            <p className="text-lg text-gray-600">
              From quick repairs to major home improvements, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {serviceCategories.map((category, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(10, 31, 68, 0.1)' }}>
                  <category.icon className="h-8 w-8" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="text-gray-600">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="btn-primary text-white px-8 py-3 rounded-md text-lg font-medium"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How are technicians vetted?",
                answer: "All technicians undergo comprehensive background checks, license verification, and insurance validation. We also review their experience, customer ratings, and professional qualifications before approving them for our platform."
              },
              {
                question: "What if I'm not satisfied with the service?",
                answer: "Your satisfaction is guaranteed. If you're not happy with the service provided, contact us within 24 hours and we'll work to make it right, including sending another technician if necessary or providing a full refund."
              },
              {
                question: "How much notice do I need to give?",
                answer: "For most services, you can book same-day or next-day appointments. However, for complex projects or during busy periods, we recommend booking 2-3 days in advance to ensure availability."
              },
              {
                question: "Are there any hidden fees?",
                answer: "No hidden fees, ever. The price quoted upfront is what you'll pay. The only additional costs would be for extra materials or services that you approve during the appointment."
              },
              {
                question: "What happens if the technician is late or doesn't show up?",
                answer: "We track all appointments in real-time and will notify you immediately if there are any delays. If a technician doesn't show up, we'll quickly arrange a replacement and may offer a discount for the inconvenience."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Join thousands of satisfied customers who trust us with their home service needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/requests/new"
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Submit a Request
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}