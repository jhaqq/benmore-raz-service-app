import { useEffect, useState, useCallback } from 'react';

export interface StatusUpdate {
  id: string;
  requestId: string;
  status: string;
  message: string;
  timestamp: string;
  technicianName?: string;
  estimatedArrival?: string;
}

// Mock WebSocket-like functionality for demo purposes
export function useRealtimeUpdates(userId?: string) {
  const [updates, setUpdates] = useState<StatusUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate WebSocket connection
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const connect = () => {
      setIsConnected(true);
      console.log('Connected to real-time updates');

      // Simulate receiving updates every 30 seconds
      interval = setInterval(() => {
        const mockUpdates: StatusUpdate[] = [
          {
            id: Math.random().toString(36).substr(2, 9),
            requestId: 'REQ-001',
            status: 'in_progress',
            message: 'Technician has arrived at your location',
            timestamp: new Date().toISOString(),
            technicianName: 'Mike Johnson'
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            requestId: 'REQ-002',
            status: 'assigned',
            message: 'A technician has been assigned to your request',
            timestamp: new Date().toISOString(),
            technicianName: 'Sarah Wilson',
            estimatedArrival: '2024-01-25T10:00:00Z'
          }
        ];

        // Randomly select one update to simulate
        const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)];
        setUpdates(prev => [randomUpdate, ...prev.slice(0, 9)]); // Keep only last 10 updates
      }, 30000); // 30 seconds
    };

    const disconnect = () => {
      setIsConnected(false);
      if (interval) clearInterval(interval);
      console.log('Disconnected from real-time updates');
    };

    connect();

    // Cleanup on unmount
    return disconnect;
  }, [userId]);

  const markAsRead = useCallback((updateId: string) => {
    setUpdates(prev => 
      prev.map(update => 
        update.id === updateId 
          ? { ...update, read: true } 
          : update
      )
    );
  }, []);

  const clearAll = useCallback(() => {
    setUpdates([]);
  }, []);

  return {
    updates,
    isConnected,
    markAsRead,
    clearAll
  };
}