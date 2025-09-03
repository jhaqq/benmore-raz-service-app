'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AddressForm from '@/components/booking/AddressForm';

interface CartItem {
  serviceId: number;
  serviceName: string;
  category: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
}

type BookingStep = 'datetime' | 'address' | 'summary' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<BookingStep>('datetime');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Booking data
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState<{
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  } | null>(null);
  const [notes, setNotes] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('pendingBooking');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // No booking data, redirect back to cart
      router.push('/book/cart');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const getCartTotal = () => {
    return cart.reduce((total, service) => total + service.totalPrice, 0);
  };

  const handleDateTimeSubmit = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('address');
    }
  };

  const handleAddressSubmit = (addressData: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  }, specialNotes: string) => {
    setAddress(addressData);
    setNotes(specialNotes);
    setCurrentStep('summary');
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In production, this would submit to API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockBookingId = `BK-${Date.now().toString().slice(-6)}`;
      setBookingId(mockBookingId);
      
      // Clear cart data
      localStorage.removeItem('pendingBooking');
      localStorage.removeItem('serviceCart');
      
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmation' && bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-gray-600 mb-2">
              Your booking has been successfully submitted.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Booking ID: <span className="font-mono font-medium">{bookingId}</span>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Next Steps:</strong> We'll contact you within 15 minutes to confirm your appointment details and provide technician information.
              </p>
            </div>
            
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/book/cart" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          {/* Mobile Progress Bar */}
          <div className="md:hidden">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[
                { id: 'datetime', name: 'Date & Time', completed: ['address', 'summary'].includes(currentStep) },
                { id: 'address', name: 'Address', completed: currentStep === 'summary' },
                { id: 'summary', name: 'Review', completed: false }
              ].map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step.completed 
                      ? 'bg-green-600 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }
                  `}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step.completed ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-gray-700">
                {currentStep === 'datetime' && 'Step 1: Date & Time'}
                {currentStep === 'address' && 'Step 2: Address'}
                {currentStep === 'summary' && 'Step 3: Review'}
              </span>
            </div>
          </div>
          
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center justify-between mb-4">
            {[
              { id: 'datetime', name: 'Date & Time', completed: ['address', 'summary'].includes(currentStep) },
              { id: 'address', name: 'Address', completed: currentStep === 'summary' },
              { id: 'summary', name: 'Review', completed: false }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.completed 
                    ? 'bg-green-600 text-white' 
                    : currentStep === step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }
                `}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{step.name}</span>
                {index < 2 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step.completed ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'datetime' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="">Select a time</option>
                      <option value="8:00">8:00 AM</option>
                      <option value="9:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={handleDateTimeSubmit}
                    disabled={!selectedDate || !selectedTime}
                    className={`
                      w-full py-3 px-4 rounded-md font-medium transition-colors
                      ${selectedDate && selectedTime
                        ? 'btn-primary text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    Continue to Address
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'address' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Address</h2>
                <AddressForm 
                  onSubmit={handleAddressSubmit}
                  onBack={() => setCurrentStep('datetime')}
                />
              </div>
            )}

            {currentStep === 'summary' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Confirm</h2>
                
                <div className="space-y-6">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Appointment</h3>
                      <p className="text-gray-600">
                        {selectedDate && format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-gray-600">
                        {selectedTime} (We'll confirm exact timing)
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  {address && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPinIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Service Address</h3>
                        <p className="text-gray-600">
                          {address.line1}
                          {address.line2 && <><br />{address.line2}</>}
                          <br />
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                    </div>
                  )}

                  {notes && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Special Instructions</h3>
                      <p className="text-blue-800 text-sm">{notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setCurrentStep('address')}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="flex-1 btn-primary text-white py-3 px-4 rounded-md font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Confirming...
                      </div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-4">
                {cart.map((service) => (
                  <div key={service.serviceId} className="border-b border-gray-100 pb-4">
                    <h4 className="font-medium text-gray-900">{service.serviceName}</h4>
                    <div className="space-y-1 mt-2">
                      {service.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium text-gray-900">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated):</span>
                  <span className="font-medium text-gray-900">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                      ${(getCartTotal() + 5 + (getCartTotal() * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}