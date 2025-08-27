'use client';

import { useState, useEffect } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { 
  BellIcon, 
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  SignalIcon,
  WifiIcon
} from '@heroicons/react/24/outline';
import { useRealtimeUpdates, StatusUpdate } from '../hooks/useRealtimeUpdates';

interface RealtimeUpdatesProps {
  userId?: string;
}

export default function RealtimeUpdates({ userId }: RealtimeUpdatesProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewUpdates, setHasNewUpdates] = useState(false);
  const { updates, isConnected, markAsRead, clearAll } = useRealtimeUpdates(userId);

  // Show new update indicator when updates come in
  useEffect(() => {
    if (updates.length > 0) {
      setHasNewUpdates(true);
    }
  }, [updates]);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setHasNewUpdates(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return `Today ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <ClockIcon className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-700" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'border-green-200 bg-green-50';
      case 'in_progress':
        return 'border-blue-200 bg-blue-50';
      case 'completed':
        return 'border-green-200 bg-green-100';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={handleToggleNotifications}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
        aria-label="View notifications"
      >
        <BellIcon className="h-6 w-6" />
        {hasNewUpdates && (
          <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Live Updates</h3>
              <div className="flex items-center gap-2">
                {/* Connection Status */}
                <div className="flex items-center gap-1">
                  {isConnected ? (
                    <WifiIcon className="h-4 w-4 text-green-600" />
                  ) : (
                    <SignalIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {updates.length > 0 && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">
                  {updates.length} update{updates.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={clearAll}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Updates List */}
          <div className="max-h-80 overflow-y-auto">
            {updates.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <BellIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No recent updates</p>
                <p className="text-xs text-gray-400 mt-1">
                  You'll see real-time updates about your service requests here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${getStatusColor(update.status)} transition-colors`}
                    onClick={() => markAsRead(update.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Request {update.requestId}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          {update.message}
                        </p>
                        
                        {update.technicianName && (
                          <p className="text-xs text-gray-600 mb-1">
                            Technician: {update.technicianName}
                          </p>
                        )}
                        
                        {update.estimatedArrival && (
                          <p className="text-xs text-gray-600 mb-1">
                            Estimated arrival: {format(new Date(update.estimatedArrival), 'MMM d, h:mm a')}
                          </p>
                        )}
                        
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(update.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Updates are delivered in real-time when available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}