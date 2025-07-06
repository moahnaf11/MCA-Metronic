import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ScreenLoader } from '@/components/common/screen-loader';
import { useAuth } from './auth-provider';

/**
 * Component to protect routes that require authentication.
 * Since we've simplified the auth system, this just checks if user is logged in.
 */
export const RequireAuth = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/auth/signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Show screen loader while checking auth status
  if (isLoading) {
    return <ScreenLoader />;
  }

  // For demo purposes, we allow access even if not authenticated
  // In a real app, you'd redirect to login page or show login prompt

  return <Outlet />;
};
