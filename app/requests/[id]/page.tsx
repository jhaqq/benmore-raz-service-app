'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'reviewed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  submittedDate: string;
  scheduledDate?: string;
  completedDate?: string;
  estimatedCost?: number;
  finalCost?: number;
  technicianName?: string;
  technicianPhone?: string;
  technicianEmail?: string;
  notes?: string;
  imageUrls?: string[];
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  specialInstructions?: string;
  preferredTime?: string;
  statusHistory: {
    status: string;
    timestamp: string;
    notes?: string;
  }[];
}

// Mock request data
const mockRequest: ServiceRequest = {
  id: 'REQ-001',
  title: 'Kitchen Faucet Repair',
  description: 'Kitchen faucet is leaking from the base and needs immediate attention. Water is dripping constantly and getting worse. The faucet is about 5 years old and this started happening last week.',
  category: 'plumbing',
  priority: 'high',
  status: 'in_progress',
  submittedDate: '2024-01-20T09:00:00Z',
  scheduledDate: '2024-01-22T14:00:00Z',
  estimatedCost: 85,
  technicianName: 'Mike Johnson',
  technicianPhone: '+1 (555) 123-4567',
  technicianEmail: 'mike.johnson@example.com',
  notes: 'Technician is on route. ETA 2:30 PM. Bringing replacement parts.',
  imageUrls: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300'
  ],
  address: {
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102'
  },
  contact: {
    phone: '+1 (555) 987-6543',
    email: 'customer@example.com'
  },
  specialInstructions: 'Please use side entrance. Dog in backyard - friendly but barks. Spare key under mat.',
  preferredTime: 'afternoon',
  statusHistory: [
    {
      status: 'submitted',
      timestamp: '2024-01-20T09:00:00Z',
      notes: 'Request submitted by customer'
    },
    {
      status: 'reviewed',
      timestamp: '2024-01-20T11:30:00Z',
      notes: 'Request reviewed and categorized as high priority plumbing issue'
    },
    {
      status: 'assigned',
      timestamp: '2024-01-21T08:15:00Z',
      notes: 'Assigned to Mike Johnson - plumbing specialist'
    },
    {
      status: 'in_progress',
      timestamp: '2024-01-22T13:45:00Z',
      notes: 'Technician en route to location'
    }
  ]
};

export default function RequestDetail() {
  const params = useParams();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        // In production, this would be an API call
        // const response = await fetch(`/api/requests/${params.id}`);
        // const requestData = await response.json();
        setRequest(mockRequest);
      } catch (error) {
        console.error('Failed to load request:', error);
        setRequest(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [params.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'reviewed':
        return <InformationCircleIcon className="h-5 w-5 text-blue-600" />;
      case 'assigned':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-700" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'reviewed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'assigned':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'in_progress':
        return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'completed':
        return 'text-green-800 bg-green-100 border-green-300';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-700 bg-red-100';
      case 'high':
        return 'text-orange-700 bg-orange-100';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'low':
        return 'text-green-700 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatPriority = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Request Not Found</h1>
          <p className="text-gray-600 mb-6">The service request you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/requests"
            className="btn-primary text-white px-6 py-2 rounded-md font-medium inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Requests
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getStatusIcon(request.status)}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {request.title}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`
                    inline-flex px-2 py-1 rounded-full text-xs font-medium
                    ${getPriorityColor(request.priority)}
                  `}>
                    {formatPriority(request.priority)} Priority
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600 capitalize">{request.category}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Request ID: <span className="font-mono">{request.id}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`
                inline-flex px-3 py-1 rounded-full text-sm font-medium border
                ${getStatusColor(request.status)}
              `}>
                {formatStatus(request.status)}
              </div>
              {request.estimatedCost && (
                <div className="text-xl font-semibold text-gray-900 mt-2">
                  ${request.finalCost || request.estimatedCost}
                  {!request.finalCost && (
                    <span className="text-sm font-normal text-gray-500"> estimated</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Current Status Alert */}
          {request.status === 'in_progress' && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start gap-3">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Service In Progress</h3>
                  <p className="text-sm text-blue-700 mt-1">{request.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
              
              {request.specialInstructions && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="text-sm font-medium text-yellow-900 mb-2">Special Instructions</h3>
                  <p className="text-sm text-yellow-700">{request.specialInstructions}</p>
                </div>
              )}
            </div>

            {/* Images */}
            {request.imageUrls && request.imageUrls.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CameraIcon className="h-5 w-5" />
                  Photos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {request.imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Service request photo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status History</h2>
              <div className="space-y-4">
                {request.statusHistory.reverse().map((entry, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(entry.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {formatStatus(entry.status)}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {format(new Date(entry.timestamp), 'MMM d, yyyy h:mm a')}
                        </time>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technician Info */}
            {request.technicianName && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Technician</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{request.technicianName}</h3>
                    <p className="text-sm text-gray-600 capitalize">{request.category} Specialist</p>
                  </div>
                  
                  {request.technicianPhone && (
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <a 
                        href={`tel:${request.technicianPhone}`}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {request.technicianPhone}
                      </a>
                    </div>
                  )}
                  
                  {request.technicianEmail && (
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <a 
                        href={`mailto:${request.technicianEmail}`}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {request.technicianEmail}
                      </a>
                    </div>
                  )}

                  <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Message Technician
                  </button>
                </div>
              </div>
            )}

            {/* Service Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Submitted:</span>
                  <span className="ml-2 text-gray-900">
                    {format(new Date(request.submittedDate), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                
                {request.scheduledDate && (
                  <div>
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="ml-2 text-gray-900">
                      {format(new Date(request.scheduledDate), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                )}
                
                {request.completedDate && (
                  <div>
                    <span className="text-gray-500">Completed:</span>
                    <span className="ml-2 text-gray-900">
                      {format(new Date(request.completedDate), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                )}
                
                {request.preferredTime && (
                  <div>
                    <span className="text-gray-500">Preferred Time:</span>
                    <span className="ml-2 text-gray-900 capitalize">{request.preferredTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                Service Location
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <div>{request.address.line1}</div>
                {request.address.line2 && <div>{request.address.line2}</div>}
                <div>{request.address.city}, {request.address.state} {request.address.zipCode}</div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{request.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{request.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-2">
                {['submitted', 'reviewed', 'assigned'].includes(request.status) && (
                  <button className="w-full px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors">
                    Cancel Request
                  </button>
                )}
                
                {request.status === 'completed' && (
                  <Link
                    href={`/feedback?request=${request.id}&service=${encodeURIComponent(request.title)}`}
                    className="block w-full px-4 py-2 btn-primary text-white rounded-md text-sm font-medium text-center"
                  >
                    Leave Feedback
                  </Link>
                )}
                
                <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Request Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}