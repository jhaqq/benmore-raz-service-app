'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { 
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon
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
  notes?: string;
  imageUrls?: string[];
}

// Mock requests data
const mockRequests: ServiceRequest[] = [
  {
    id: 'REQ-001',
    title: 'Kitchen Faucet Repair',
    description: 'Kitchen faucet is leaking from the base and needs immediate attention',
    category: 'plumbing',
    priority: 'high',
    status: 'in_progress',
    submittedDate: '2024-01-20T09:00:00Z',
    scheduledDate: '2024-01-22T14:00:00Z',
    estimatedCost: 85,
    technicianName: 'Mike Johnson',
    technicianPhone: '+1 (555) 123-4567',
    notes: 'Technician is on route. ETA 2:30 PM'
  },
  {
    id: 'REQ-002',
    title: 'Electrical Outlet Installation',
    description: 'Need 3 new outlets installed in home office',
    category: 'electrical',
    priority: 'medium',
    status: 'assigned',
    submittedDate: '2024-01-18T15:30:00Z',
    scheduledDate: '2024-01-25T10:00:00Z',
    estimatedCost: 220,
    technicianName: 'Sarah Wilson'
  },
  {
    id: 'REQ-003',
    title: 'Bathroom Deep Clean',
    description: 'Deep cleaning service for master bathroom',
    category: 'cleaning',
    priority: 'low',
    status: 'completed',
    submittedDate: '2024-01-15T11:00:00Z',
    scheduledDate: '2024-01-17T09:00:00Z',
    completedDate: '2024-01-17T12:00:00Z',
    estimatedCost: 120,
    finalCost: 120,
    technicianName: 'Maria Garcia'
  },
  {
    id: 'REQ-004',
    title: 'HVAC System Check',
    description: 'Annual HVAC maintenance and filter replacement',
    category: 'hvac',
    priority: 'medium',
    status: 'reviewed',
    submittedDate: '2024-01-19T10:15:00Z',
    estimatedCost: 150
  }
];

export default function Requests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load requests data
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        // In production, this would be an API call
        // await fetch('/api/requests');
        setRequests(mockRequests);
      } catch (error) {
        console.error('Failed to load requests:', error);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = searchTerm === '' || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'reviewed':
        return <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />;
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
        <div className="max-w-6xl mx-auto px-4">
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
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Service Requests</h1>
            <p className="text-gray-600 mt-1">Track your service requests and their progress</p>
          </div>
          
          <Link
            href="/requests/new"
            className="btn-primary text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            New Request
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="reviewed">Reviewed</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Request Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Total Requests', 
              value: requests.length, 
              color: 'text-gray-600',
              bgColor: 'bg-gray-50'
            },
            { 
              label: 'In Progress', 
              value: requests.filter(r => ['assigned', 'in_progress'].includes(r.status)).length, 
              color: 'text-blue-600',
              bgColor: 'bg-blue-50'
            },
            { 
              label: 'Completed', 
              value: requests.filter(r => r.status === 'completed').length, 
              color: 'text-green-600',
              bgColor: 'bg-green-50'
            },
            { 
              label: 'Pending Review', 
              value: requests.filter(r => r.status === 'submitted').length, 
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50'
            }
          ].map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
              <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filter !== 'all' ? 'No matching requests found' : 'No requests yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Submit your first service request to get started'
                }
              </p>
              {(!searchTerm && filter === 'all') && (
                <Link
                  href="/requests/new"
                  className="btn-primary text-white px-6 py-2 rounded-md font-medium inline-flex items-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Submit First Request
                </Link>
              )}
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {request.title}
                        </h3>
                        <span className={`
                          inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${getPriorityColor(request.priority)}
                        `}>
                          {formatPriority(request.priority)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{request.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">{request.category}</span>
                        <span>•</span>
                        <span>Submitted {format(new Date(request.submittedDate), 'MMM d, yyyy')}</span>
                        {request.scheduledDate && (
                          <>
                            <span>•</span>
                            <span>Scheduled {format(new Date(request.scheduledDate), 'MMM d, yyyy h:mm a')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`
                      inline-flex px-3 py-1 rounded-full text-xs font-medium border
                      ${getStatusColor(request.status)}
                    `}>
                      {formatStatus(request.status)}
                    </div>
                    {request.estimatedCost && (
                      <div className="text-lg font-semibold text-gray-900 mt-2">
                        ${request.finalCost || request.estimatedCost}
                        {!request.finalCost && (
                          <span className="text-sm font-normal text-gray-500"> est.</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Technician Info */}
                {request.technicianName && (
                  <div className="bg-gray-50 rounded-md p-3 mb-4">
                    <div className="text-sm text-gray-700">
                      <strong>Technician:</strong> {request.technicianName}
                      {request.technicianPhone && (
                        <span className="ml-4">
                          <strong>Phone:</strong> {request.technicianPhone}
                        </span>
                      )}
                    </div>
                    {request.notes && (
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Notes:</strong> {request.notes}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Request ID: <span className="font-mono">{request.id}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {['submitted', 'reviewed', 'assigned'].includes(request.status) && (
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Cancel
                      </button>
                    )}
                    {request.status === 'completed' && (
                      <Link
                        href={`/feedback?request=${request.id}&service=${encodeURIComponent(request.title)}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Leave Feedback
                      </Link>
                    )}
                    <Link
                      href={`/requests/${request.id}`}
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