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

  if (loading && user.session === null) {
    return <LoadingPage />;
  }

  if (user.session === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (user.detail_user === undefined) {
    return <Navigate to="/update-biodata" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
