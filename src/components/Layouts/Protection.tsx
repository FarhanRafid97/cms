import { useAuth } from '@/context/Auth';
import { ReactNode, useEffect } from 'react';
import Navigate from '../NavigateComp';
import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { setSearchParamsClient } from '@/store/searchParams';
import { LoadingPage } from './LoadingPage';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { search } = useGetFilterSearchparams();
  useEffect(() => {
    setSearchParamsClient({ searchParams: search });
  }, [search]);

  if (loading) {
    return <LoadingPage />;
  }

  if (user === undefined) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
