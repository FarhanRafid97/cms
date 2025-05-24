import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterSearchParams } from '@/types/globals';
import { LIMIT_GET_POSTS } from '@/lib/constant';

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
    const obj = Object.fromEntries(memoSearchParams.entries()) as unknown as FilterSearchParams;

    if (!obj._offsetFrom) {
      obj._offsetFrom = '0';
    }

    if (!obj._offsetTo) {
      obj._offsetTo = `${LIMIT_GET_POSTS}`;
    }

    return obj;
  }, [search]);

  return { search: searchParams };
};
