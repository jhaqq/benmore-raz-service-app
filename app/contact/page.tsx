'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  subject: z.enum(['general', 'service_inquiry', 'technical_support', 'billing', 'complaint', 'compliment'], {
    errorMap: () => ({ message: 'Please select a subject' })
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a priority level' })
  }),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods = [
  {
    icon: PhoneIcon,
    title: 'Call Us',
    description: 'Speak directly with our support team',
    contact: '(555) 123-4567',
    action: 'tel:+15551234567',
    availability: 'Mon-Fri 8am-8pm, Sat-Sun 9am-5pm'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Support',
    description: 'Send us a message anytime',
    contact: 'support@example.com',
    action: 'mailto:support@example.com',
    availability: 'We respond within 4 hours'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    contact: 'Available on our website',
    action: '#',
    availability: 'Mon-Fri 8am-8pm PST'
  }
];

const officeLocations = [
  {
    city: 'San Francisco',
    address: '123 Market Street, Suite 400',
    zipCode: 'San Francisco, CA 94102',
    phone: '(415) 555-0100',
    hours: 'Mon-Fri 8am-6pm'
  },
  {
    city: 'Los Angeles',
    address: '456 Wilshire Blvd, Floor 10',
    zipCode: 'Los Angeles, CA 90010',
    phone: '(323) 555-0200',
    hours: 'Mon-Fri 8am-6pm'
  },
  {
    city: 'San Diego',
    address: '789 Broadway, Suite 250',
    zipCode: 'San Diego, CA 92101',
    phone: '(619) 555-0300',
    hours: 'Mon-Fri 9am-5pm'
  }
];

const subjectOptions = [
  { value: 'general', label: 'General Inquiry', description: 'Questions about our services' },
  { value: 'service_inquiry', label: 'Service Request', description: 'Need help with booking a service' },
  { value: 'technical_support', label: 'Technical Support', description: 'Issues with the website or app' },
  { value: 'billing', label: 'Billing Question', description: 'Questions about payments or invoices' },
  { value: 'complaint', label: 'File a Complaint', description: 'Report an issue with service quality' },
  { value: 'compliment', label: 'Leave a Compliment', description: 'Share positive feedback' }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  });

  const selectedSubject = watch('subject');
  const message = watch('message');
  const remainingChars = Math.max(0, 1000 - (message?.length || 0));

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      // In production, this would submit to API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      
      console.log('Contact form submitted:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Thank You for Contacting Us!
            </h1>
            
            <p className="text-gray-600 mb-6">
              We've received your message and will get back to you within 4 hours during business hours.
            </p>
            
            <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(10, 31, 68, 0.05)' }}>
              <p className="text-sm" style={{ color: 'var(--primary)' }}>
                <strong>Need immediate assistance?</strong><br />
                Call us at (555) 123-4567 for urgent matters
              </p>
            </div>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary text-white px-6 py-2 rounded-md font-medium"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, need support, or want to share feedback? 
            We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(10, 31, 68, 0.1)' }}>
                  <method.icon className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="font-medium text-lg block mb-2 hover:underline transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  {method.contact}
                </a>
                <p className="text-sm text-gray-500">
                  {method.availability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 bg-white"
                    style={{ '--tw-ring-color': 'var(--primary)' }}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 bg-white"
                    style={{ '--tw-ring-color': 'var(--primary)' }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 bg-white"
                  style={{ '--tw-ring-color': 'var(--primary)' }}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subjectOptions.map((option) => (
                    <label key={option.value} className="relative">
                      <input
                        {...register('subject')}
                        type="radio"
                        value={option.value}
                        className="sr-only peer"
                      />
                      <div className="cursor-pointer rounded-lg border border-gray-300 p-4 hover:bg-gray-50 peer-checked:border-2 transition-all peer-checked:border-primary" style={{ '--primary': 'var(--primary)' }}>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Low', description: 'General question', color: 'peer-checked:bg-green-50 peer-checked:border-green-500' },
                    { value: 'medium', label: 'Medium', description: 'Important matter', color: 'peer-checked:bg-yellow-50 peer-checked:border-yellow-500' },
                    { value: 'high', label: 'High', description: 'Urgent issue', color: 'peer-checked:bg-red-50 peer-checked:border-red-500' }
                  ].map((priority) => (
                    <label key={priority.value} className="relative">
                      <input
                        {...register('priority')}
                        type="radio"
                        value={priority.value}
                        className="sr-only peer"
                      />
                      <div className={`cursor-pointer rounded-lg border border-gray-300 p-3 text-center hover:bg-gray-50 ${priority.color} transition-colors`}>
                        <div className="font-medium text-gray-900">{priority.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{priority.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none text-gray-900 bg-white"
                  style={{ '--tw-ring-color': 'var(--primary)' }}
                  placeholder="Please provide details about your inquiry, question, or feedback. The more specific you can be, the better we can help you."
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500">
                    {selectedSubject === 'complaint' && 'Please include details like date, technician name, and specific issues'}
                    {selectedSubject === 'service_inquiry' && 'Describe the service you need and any specific requirements'}
                    {selectedSubject === 'technical_support' && 'Please describe the issue and what you were trying to do'}
                  </span>
                  <span className={remainingChars < 100 ? 'text-red-500' : 'text-gray-500'}>
                    {remainingChars} characters remaining
                  </span>
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`
                    w-full py-3 px-6 rounded-md font-medium text-white transition-all
                    ${isValid && !isSubmitting
                      ? 'btn-primary'
                      : 'bg-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600">
              Visit us at any of our offices throughout California
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPinIcon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {location.city}
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="text-gray-700">
                    {location.address}<br />
                    {location.zipCode}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${location.phone}`} className="hover:underline transition-colors" style={{ color: 'var(--primary)' }}>
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{location.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <QuestionMarkCircleIcon className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Looking for Quick Answers?
            </h2>
            <p className="text-gray-600 mb-6">
              Check out our FAQ section for instant answers to common questions, 
              or browse our help center for detailed guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-white px-6 py-2 rounded-md font-medium">
                View FAQ
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}