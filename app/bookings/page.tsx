'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  serviceName: string;
  serviceCategory: string;
  bookingDate: string;
  bookingTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: 'BK-123456',
    serviceName: 'House Cleaning',
    serviceCategory: 'cleaning',
    bookingDate: '2024-01-15',
    bookingTime: '10:00',
    status: 'confirmed',
    totalAmount: 120,
    address: {
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    createdAt: '2024-01-10T10:30:00Z'
  },
  {
    id: 'BK-123457',
    serviceName: 'TV Wall Mount',
    serviceCategory: 'repair',
    bookingDate: '2024-01-08',
    bookingTime: '14:00',
    status: 'completed',
    totalAmount: 75,
    address: {
      line1: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110'
    },
    createdAt: '2024-01-05T15:20:00Z'
  },
  {
    id: 'BK-123458',
    serviceName: 'Deep Cleaning',
    serviceCategory: 'cleaning',
    bookingDate: '2024-01-20',
    bookingTime: '09:00',
    status: 'pending',
    totalAmount: 220,
    address: {
      line1: '789 Pine Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108'
    },
    createdAt: '2024-01-12T09:15:00Z'
  }
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    // Load bookings data
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        // In production, this would be an API call
        // await fetch('/api/bookings');
        setBookings(mockBookings);
      } catch (error) {
        console.error('Failed to load bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'completed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your service appointments</p>
          </div>
          
          <Link
            href="/services"
            className="btn-primary text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Book Service
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All', count: bookings.length },
                { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
                { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'all' | 'pending' | 'confirmed' | 'completed')}
                  className={`
                    whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors
                    ${filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    filter === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? 'Book your first service to get started'
                  : `You don't have any ${filter} bookings at the moment`
                }
              </p>
              {filter === 'all' && (
                <Link
                  href="/services"
                  className="btn-primary text-white px-6 py-2 rounded-md font-medium inline-flex items-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Book Your First Service
                </Link>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(booking.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.serviceName}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {booking.serviceCategory} service
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(new Date(booking.bookingDate), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {booking.bookingTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`
                      inline-flex px-3 py-1 rounded-full text-xs font-medium border
                      ${getStatusColor(booking.status)}
                    `}>
                      {formatStatus(booking.status)}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">
                      ${booking.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600 mb-4">
                  <MapPinIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>{booking.address.line1}</div>
                    {booking.address.line2 && <div>{booking.address.line2}</div>}
                    <div>{booking.address.city}, {booking.address.state} {booking.address.zipCode}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Booking ID: <span className="font-mono">{booking.id}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {booking.status === 'confirmed' && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Reschedule
                      </button>
                    )}
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Cancel
                      </button>
                    )}
                    {booking.status === 'completed' && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Book Again
                      </button>
                    )}
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}