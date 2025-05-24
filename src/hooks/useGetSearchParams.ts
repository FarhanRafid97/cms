import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterSearchParams } from '@/types/globals';

interface QueryParams {
  [key: string]: string | string[];
}

export const useGetQueryParams = (): { params: QueryParams } => {
  const search = useSearchParams();

  const params = useMemo(() => {
    const searchParams = new URLSearchParams(search as unknown as string);
    return Object.fromEntries(searchParams.entries());
  }, [search]);

  return { params };
};

export const useGetFilterSearchparams = (): { search: FilterSearchParams } => {
  const search = useSearchParams();

  const searchParams = useMemo(() => {
    const memoSearchParams = new URLSearchParams(search as unknown as string);
    const obj = Object.fromEntries(memoSearchParams.entries());
    return {
      _limit: obj._limit || '50',
      _page: obj._page || '1',
      ...obj,
    };
  }, [search]);

  return { search: searchParams };
};
