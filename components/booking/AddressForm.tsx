'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const addressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters').regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional()
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (address: Omit<AddressFormData, 'notes'>, notes: string) => void;
  onBack: () => void;
}

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

export default function AddressForm({ onSubmit, onBack }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange'
  });

  const notes = watch('notes');
  const remainingChars = 500 - (notes?.length || 0);

  const onFormSubmit = (data: AddressFormData) => {
    const { notes: formNotes, ...address } = data;
    onSubmit(address, formNotes || '');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 p-2 -ml-2 rounded-md transition-colors"
            aria-label="Go back to date and time selection"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            Service Address
          </h2>
        </div>
        <p className="text-gray-600">
          Where should we provide the service?
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
        <div className="space-y-6">
          {/* Address Line 1 */}
          <div>
            <label htmlFor="line1" className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('line1')}
                type="text"
                id="line1"
                placeholder="123 Main Street"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.line1 ? 'border-red-300' : 'border-gray-300'}
                `}
                aria-invalid={errors.line1 ? 'true' : 'false'}
                aria-describedby={errors.line1 ? 'line1-error' : undefined}
              />
              <MapPinIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.line1 && (
              <p id="line1-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.line1.message}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div>
            <label htmlFor="line2" className="block text-sm font-medium text-gray-700 mb-2">
              Apartment, Suite, etc. (Optional)
            </label>
            <input
              {...register('line2')}
              type="text"
              id="line2"
              placeholder="Apt 4B, Suite 200, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* City, State, ZIP Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div className="md:col-span-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                {...register('city')}
                type="text"
                id="city"
                placeholder="San Francisco"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.city ? 'border-red-300' : 'border-gray-300'}
                `}
                aria-invalid={errors.city ? 'true' : 'false'}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && (
                <p id="city-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State */}
            <div className="md:col-span-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                {...register('state')}
                id="state"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.state ? 'border-red-300' : 'border-gray-300'}
                `}
                aria-invalid={errors.state ? 'true' : 'false'}
                aria-describedby={errors.state ? 'state-error' : undefined}
              >
                <option value="">Select State</option>
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p id="state-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* ZIP Code */}
            <div className="md:col-span-1">
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                {...register('zipCode')}
                type="text"
                id="zipCode"
                placeholder="94102"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.zipCode ? 'border-red-300' : 'border-gray-300'}
                `}
                aria-invalid={errors.zipCode ? 'true' : 'false'}
                aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
              />
              {errors.zipCode && (
                <p id="zipCode-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              {...register('notes')}
              id="notes"
              rows={3}
              placeholder="Any special instructions, access codes, parking notes, etc."
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              aria-describedby="notes-help"
            />
            <div className="mt-1 flex justify-between text-sm text-gray-500">
              <span id="notes-help">Help our technicians find and access your location</span>
              <span className={remainingChars < 50 ? 'text-red-500' : ''}>
                {remainingChars} characters remaining
              </span>
            </div>
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-6 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={!isValid}
            className={`
              flex-1 py-3 px-6 rounded-md font-medium text-white transition-all
              ${isValid
                ? 'btn-primary' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
}