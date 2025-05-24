import { FilterSearchParams } from '@/types/globals';
import { create } from 'zustand';

interface LogoutProps {
  searchParams: FilterSearchParams | null;
}

export const useSearchParamsClient = create<LogoutProps>(() => ({
  searchParams: null,
}));

export const setSearchParamsClient = ({ searchParams }: { searchParams: FilterSearchParams }) => {
  return useSearchParamsClient.setState({ searchParams });
};
