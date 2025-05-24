import { useAuth } from '@/context/Auth';
import { ReactNode } from 'react';
import Navigate from '../NavigateComp';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
