'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CheckCircleIcon, 
  DocumentTextIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const applicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  // Address
  address: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  
  // Professional Information
  yearsExperience: z.enum(['0-1', '2-5', '6-10', '10+'], {
    errorMap: () => ({ message: 'Please select your experience level' })
  }),
  specialties: z.array(z.string()).min(1, 'Please select at least one specialty'),
  hasLicense: z.boolean(),
  licenseNumber: z.string().optional(),
  hasInsurance: z.boolean(),
  hasOwnTools: z.boolean(),
  hasOwnVehicle: z.boolean(),
  
  // Availability
  availability: z.array(z.string()).min(1, 'Please select your availability'),
  preferredHours: z.enum(['morning', 'afternoon', 'evening', 'flexible'], {
    errorMap: () => ({ message: 'Please select preferred hours' })
  }),
  canWorkWeekends: z.boolean(),
  
  // Background
  hasConvictions: z.boolean(),
  convictionDetails: z.string().optional(),
  references: z.string().min(10, 'Please provide at least one professional reference'),
  additionalInfo: z.string().optional(),
  
  // Legal
  eligibleToWork: z.boolean().refine(val => val === true, 'You must be eligible to work in the US'),
  backgroundCheckConsent: z.boolean().refine(val => val === true, 'Background check consent is required'),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const specialtyOptions = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Painting',
  'Carpentry',
  'Flooring',
  'Appliance Repair',
  'General Handyman',
  'Cleaning Services',
  'Landscaping',
  'Roofing',
  'Drywall',
  'Other'
];

const availabilityOptions = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function TechnicianApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange',
    defaultValues: {
      specialties: [],
      availability: [],
      hasLicense: false,
      hasInsurance: false,
      hasOwnTools: false,
      hasOwnVehicle: false,
      canWorkWeekends: false,
      hasConvictions: false,
      eligibleToWork: false,
      backgroundCheckConsent: false,
      termsAccepted: false
    }
  });

  const watchedSpecialties = watch('specialties') || [];
  const watchedAvailability = watch('availability') || [];
  const hasConvictions = watch('hasConvictions');

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      // In production, this would submit to API
      // await fetch('/api/technician-applications', { method: 'POST', body: JSON.stringify(data) });
      
      // In production, send to backend
      console.log('Application submitted:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setValue('specialties', [...watchedSpecialties, specialty], { shouldValidate: true });
    } else {
      setValue('specialties', watchedSpecialties.filter(s => s !== specialty), { shouldValidate: true });
    }
  };

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    if (checked) {
      setValue('availability', [...watchedAvailability, day], { shouldValidate: true });
    } else {
      setValue('availability', watchedAvailability.filter(d => d !== day), { shouldValidate: true });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-blue-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your interest in joining our team. We'll review your application and contact you within 3-5 business days.
            </p>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <DocumentTextIcon className="h-4 w-4" />
                <span>Application under review</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>Response within 3-5 business days</span>
              </div>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're looking for skilled technicians to provide exceptional home services. 
            Join our growing team and build a flexible, rewarding career.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <BanknotesIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Pay</h3>
            <p className="text-gray-600">Earn $25-$50+ per hour based on skills and experience</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
            <p className="text-gray-600">Choose your hours and work when it fits your life</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Team</h3>
            <p className="text-gray-600">Dedicated support team to help you succeed</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('dateOfBirth')}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

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
            </section>

            {/* Professional Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
                Professional Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['0-1', '2-5', '6-10', '10+'].map((option) => (
                      <label key={option} className="relative">
                        <input
                          {...register('yearsExperience')}
                          type="radio"
                          value={option}
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-300 p-3 text-center text-sm font-medium hover:bg-gray-50 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 transition-colors">
                          {option} years
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.yearsExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.yearsExperience.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialties <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specialtyOptions.map((specialty) => (
                      <label key={specialty} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={watchedSpecialties.includes(specialty)}
                          onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                  {errors.specialties && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialties.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        {...register('hasLicense')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        I have relevant licenses
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        {...register('hasInsurance')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        I have liability insurance
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        {...register('hasOwnTools')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        I have my own tools
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        {...register('hasOwnVehicle')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        I have reliable transportation
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number (if applicable)
                  </label>
                  <input
                    {...register('licenseNumber')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter license number"
                  />
                </div>
              </div>
            </section>

            {/* Availability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ClockIcon className="h-6 w-6 text-blue-600" />
                Availability
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Days <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availabilityOptions.map((day) => (
                      <label key={day} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={watchedAvailability.includes(day)}
                          onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availability && (
                    <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Hours <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'morning', label: 'Morning (8am-12pm)' },
                      { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
                      { value: 'evening', label: 'Evening (5pm-8pm)' },
                      { value: 'flexible', label: 'Flexible' }
                    ].map((option) => (
                      <label key={option.value} className="relative">
                        <input
                          {...register('preferredHours')}
                          type="radio"
                          value={option.value}
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-300 p-3 text-center text-sm font-medium hover:bg-gray-50 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 transition-colors">
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.preferredHours && (
                    <p className="mt-1 text-sm text-red-600">{errors.preferredHours.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    {...register('canWorkWeekends')}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    I am available to work weekends
                  </label>
                </div>
              </div>
            </section>

            {/* Background Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Background Information</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      {...register('hasConvictions')}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      I have been convicted of a felony or misdemeanor
                    </label>
                  </div>

                  {hasConvictions && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Please provide details
                      </label>
                      <textarea
                        {...register('convictionDetails')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
                        placeholder="Please explain the circumstances"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional References <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('references')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
                    placeholder="Please provide contact information for at least one professional reference (name, relationship, phone number, email)"
                  />
                  {errors.references && (
                    <p className="mt-1 text-sm text-red-600">{errors.references.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    {...register('additionalInfo')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white resize-none"
                    placeholder="Tell us anything else we should know about your experience or qualifications"
                  />
                </div>
              </div>
            </section>

            {/* Legal Requirements */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Legal Requirements</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    {...register('eligibleToWork')}
                    type="checkbox"
                    className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I am authorized to work in the United States and will provide proper documentation upon employment <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.eligibleToWork && (
                  <p className="text-sm text-red-600">{errors.eligibleToWork.message}</p>
                )}

                <div className="flex items-start gap-3">
                  <input
                    {...register('backgroundCheckConsent')}
                    type="checkbox"
                    className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I consent to a background check and drug screening as part of the application process <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.backgroundCheckConsent && (
                  <p className="text-sm text-red-600">{errors.backgroundCheckConsent.message}</p>
                )}

                <div className="flex items-start gap-3">
                  <input
                    {...register('termsAccepted')}
                    type="checkbox"
                    className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the terms and conditions and understand that this is an application for employment and does not guarantee employment <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>
                )}
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
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}