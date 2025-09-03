'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
  wouldRecommend: z.boolean().optional(),
  serviceQuality: z.enum(['excellent', 'good', 'fair', 'poor']).optional(),
  timeliness: z.enum(['early', 'on_time', 'late']).optional()
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

function FeedbackForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get('booking');
  const serviceName = searchParams?.get('service') || 'service';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange'
  });

  const rating = watch('rating') || 0;
  const comment = watch('comment');
  const remainingChars = 500 - (comment?.length || 0);

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      // In production, this would submit to API
      // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(data) });
      
      // In production, send to backend
      console.log('Feedback submitted:', { ...data, bookingId });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
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
              Thank You for Your Feedback!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Your feedback helps us improve our services and provide better experiences for all customers.
            </p>
            
            <div className="space-y-3">
              <Link
                href="/bookings"
                className="block btn-primary text-white py-3 px-6 rounded-md font-medium w-full"
              >
                View My Bookings
              </Link>
              
              <Link
                href="/services"
                className="block border border-gray-300 py-3 px-6 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full"
              >
                Book Another Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              How was your {serviceName.toLowerCase()}?
            </h1>
            <p className="text-gray-600">
              Your feedback helps us maintain high service quality
            </p>
            {bookingId && (
              <p className="text-sm text-gray-500 mt-2">
                Booking ID: <span className="font-mono">{bookingId}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hoveredRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setValue('rating', star, { shouldValidate: true })}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      {isActive ? (
                        <StarIcon className="h-8 w-8 text-yellow-400" />
                      ) : (
                        <StarOutlineIcon className="h-8 w-8 text-gray-300" />
                      )}
                    </button>
                  );
                })}
                <span className="ml-3 text-sm text-gray-600">
                  {rating > 0 && (
                    <>
                      {rating} of 5 stars
                      {rating <= 2 && " - We're sorry to hear that"}
                      {rating === 3 && " - Thank you for the feedback"}
                      {rating >= 4 && " - Thank you! We're glad you're satisfied"}
                    </>
                  )}
                </span>
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            {/* Service Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Quality
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'good', label: 'Good' },
                  { value: 'fair', label: 'Fair' },
                  { value: 'poor', label: 'Poor' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      {...register('serviceQuality')}
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
            </div>

            {/* Timeliness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Arrival Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'early', label: 'Early' },
                  { value: 'on_time', label: 'On Time' },
                  { value: 'late', label: 'Late' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      {...register('timeliness')}
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
            </div>

            {/* Would Recommend */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  {...register('wouldRecommend')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  I would recommend this service to others
                </span>
              </label>
            </div>

            {/* Written Feedback */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                {...register('comment')}
                id="comment"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Tell us about your experience, any issues, or suggestions for improvement..."
              />
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>Help us improve our service</span>
                <span className={remainingChars < 50 ? 'text-red-500' : ''}>
                  {remainingChars} characters remaining
                </span>
              </div>
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting Feedback...
                  </div>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Feedback() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">Loading...</div>}>
      <FeedbackForm />
    </Suspense>
  );
}