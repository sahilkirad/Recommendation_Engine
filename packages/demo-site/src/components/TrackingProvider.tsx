// File: packages/demo-site/src/components/TrackingProvider.tsx
'use client';
import { useEffect } from 'react';

export const getVisitorId = () => {
  if (typeof window === 'undefined') return null;
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `vis-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getVisitorId(); // Ensures a visitorId is set when the app loads
  }, []);
  return <>{children}</>;
}