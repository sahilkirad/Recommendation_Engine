// File: packages/platform-frontend/src/components/auth/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is our HOC
const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      // Check for the token in local storage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // If no token, redirect to the login page
        router.replace('/login');
      }
    }, [router]);

    // If the token exists, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;