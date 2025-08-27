'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { 
  CheckCircleIcon,
  PhotoIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const requestSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.enum([
    'plumbing', 'electrical', 'hvac', 'painting', 'carpentry', 
    'flooring', 'appliance_repair', 'cleaning', 'landscaping', 
    'general_handyman', 'other'
  ], {
    errorMap: () => ({ message: 'Please select a service category' })
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    errorMap: () => ({ message: 'Please select a priority level' })
  }),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  preferredDate: z.string().optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'flexible'], {
    errorMap: () => ({ message: 'Please select a preferred time' })
  }),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  contactPhone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  contactEmail: z.string().email('Please enter a valid email address'),
  specialInstructions: z.string().optional(),
  images: z.array(z.any()).optional()
});

type RequestFormData = z.infer<typeof requestSchema>;

const categories = [
  { value: 'plumbing', label: 'Plumbing', description: 'Faucets, pipes, toilets, water heaters' },
  { value: 'electrical', label: 'Electrical', description: 'Outlets, switches, lighting, wiring' },
  { value: 'hvac', label: 'HVAC', description: 'Heating, cooling, ventilation systems' },
  { value: 'painting', label: 'Painting', description: 'Interior/exterior painting, touch-ups' },
  { value: 'carpentry', label: 'Carpentry', description: 'Furniture assembly, repairs, installations' },
  { value: 'flooring', label: 'Flooring', description: 'Tile, hardwood, carpet repairs' },
  { value: 'appliance_repair', label: 'Appliance Repair', description: 'Kitchen/laundry appliances' },
  { value: 'cleaning', label: 'Cleaning', description: 'Deep cleaning, maintenance cleaning' },
  { value: 'landscaping', label: 'Landscaping', description: 'Lawn care, garden maintenance' },
  { value: 'general_handyman', label: 'General Handyman', description: 'Small repairs and maintenance' },
  { value: 'other', label: 'Other', description: 'Custom or specialized services' }
];

const priorityLevels = [
  { 
    value: 'low', 
    label: 'Low Priority', 
    description: 'Can wait 1-2 weeks',
    color: 'text-green-700 bg-green-50 border-green-200'
  },
  { 
    value: 'medium', 
    label: 'Medium Priority', 
    description: 'Needed within a few days',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200'
  },
  { 
    value: 'high', 
    label: 'High Priority', 
    description: 'Urgent, needed ASAP',
    color: 'text-orange-700 bg-orange-50 border-orange-200'
  },
  { 
    value: 'urgent', 
    label: 'Emergency', 
    description: 'Safety issue or major problem',
    color: 'text-red-700 bg-red-50 border-red-200'
  }
];

export default function NewRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    mode: 'onChange'
  });

  const selectedCategory = watch('category');
  const selectedPriority = watch('priority');
  const description = watch('description');
  const remainingChars = Math.max(0, 500 - (description?.length || 0));

  const onSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with form data and images
      // In production, this would submit to API
      // await fetch('/api/requests', { method: 'POST', body: formData });
      
      // Generate mock request ID
      const requestId = `REQ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setSubmittedRequestId(requestId);
      
      console.log('Request submitted:', { ...data, images: selectedImages });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
              Request Submitted Successfully!
            </h1>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Request ID</p>
              <p className="text-xl font-mono font-semibold text-gray-900">{submittedRequestId}</p>
            </div>
            
            <p className="text-gray-600 mb-8">
              We've received your service request and will review it shortly. You'll receive an email confirmation and updates as we process your request.
            </p>
            
            <div className="space-y-3">
              <Link
                href="/requests"
                className="block btn-primary text-white py-3 px-6 rounded-md font-medium w-full"
              >
                View My Requests
              </Link>
              
              <Link
                href="/requests/new"
                className="block border border-gray-300 py-3 px-6 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full"
              >
                Submit Another Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit Service Request</h1>
          <p className="text-lg text-gray-600">
            Describe your service needs and we'll match you with the right technician
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Service Details */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Brief description of what you need (e.g., 'Kitchen faucet repair')"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Service Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label key={category.value} className="relative">
                        <input
                          {...register('category')}
                          type="radio"
                          value={category.value}
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-300 p-4 hover:bg-gray-50 peer-checked:bg-blue-50 peer-checked:border-blue-500 transition-colors">
                          <div className="font-medium text-gray-900">{category.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Priority Level <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {priorityLevels.map((priority) => (
                      <label key={priority.value} className="relative">
                        <input
                          {...register('priority')}
                          type="radio"
                          value={priority.value}
                          className="sr-only peer"
                        />
                        <div className={`
                          cursor-pointer rounded-lg border p-4 hover:bg-gray-50 transition-colors
                          peer-checked:${priority.color.replace('text-', 'border-').replace('bg-', '').replace(' border-', ' peer-checked:bg-').replace('-700', '-500').replace('-50', '-50')}
                        `}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{priority.label}</div>
                              <div className="text-sm text-gray-600">{priority.description}</div>
                            </div>
                            {priority.value === 'urgent' && (
                              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('description')}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
                    placeholder="Please provide detailed information about the problem or service needed. Include any relevant details about location, symptoms, materials needed, etc."
                  />
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-500">Be as specific as possible to help us match you with the right technician</span>
                    <span className={remainingChars < 50 ? 'text-red-500' : 'text-gray-500'}>
                      {remainingChars} characters remaining
                    </span>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Images */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos (Optional)</h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload photos to help technicians better understand your needs. Maximum 5 images.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-center">
                      <PhotoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload images</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Scheduling */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferred Scheduling</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date (Optional)
                  </label>
                  <input
                    {...register('preferredDate')}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'morning', label: 'Morning\n(8am-12pm)' },
                      { value: 'afternoon', label: 'Afternoon\n(12pm-5pm)' },
                      { value: 'evening', label: 'Evening\n(5pm-8pm)' },
                      { value: 'flexible', label: 'Flexible' }
                    ].map((time) => (
                      <label key={time.value} className="relative">
                        <input
                          {...register('preferredTime')}
                          type="radio"
                          value={time.value}
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer rounded-md border border-gray-300 p-3 text-center text-sm font-medium hover:bg-gray-50 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 transition-colors whitespace-pre-line">
                          {time.label}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.preferredTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.preferredTime.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Contact & Location */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact & Location</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('contactPhone')}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="(555) 123-4567"
                    />
                    {errors.contactPhone && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('contactEmail')}
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="your.email@example.com"
                    />
                    {errors.contactEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="San Francisco"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('state')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="CA"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('zipCode')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="94102"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Special Instructions */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Instructions</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  {...register('specialInstructions')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
                  placeholder="Any special instructions, access codes, pet information, or other important details for the technician"
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
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
                    Submitting Request...
                  </div>
                ) : (
                  'Submit Service Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}