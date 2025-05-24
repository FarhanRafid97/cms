import { useGetDynamicUrl } from '@/hooks/useGetDyanmicUrl';

import Link from 'next/link';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { LIMIT_GET_POSTS } from '@/lib/constant';
import { useSearchParamsClient } from '@/store/searchParams';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const PaginationContent = ({
  disabled,
  pathname,
  search,
  children,
  isSelected = false,
}: {
  disabled?: boolean;
  isSelected?: boolean;
  pathname: string;
  search: string;
  children: React.ReactNode;
}) => {
  if (disabled || isSelected) {
    return (
      <Button
        variant={isSelected ? 'default' : 'outline'}
        className="h-8 w-8 p-0 flex"
        disabled={disabled}
      >
        {children}
      </Button>
    );
  }
  return (
    <Link
      scroll={false}
      href={{
        pathname,
        search,
      }}
    >
      <Button
        variant={isSelected ? 'default' : 'outline'}
        className="h-8 w-8 p-0 flex"
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  );
};

export default function PaginationNextOnly({
  isFetching,
  totalElement,
}: {
  isFetching: boolean;
  totalElement: number;
}) {
  const { pathname } = useGetDynamicUrl();
  const { searchParams } = useSearchParamsClient();

  const minusStep = Number(searchParams?._offsetFrom || 0) - LIMIT_GET_POSTS;
  const prevStep = minusStep <= 0 ? 0 : minusStep;
  const nextStep = Number(searchParams?._offsetTo || LIMIT_GET_POSTS) + LIMIT_GET_POSTS;

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 items-center justify-end md:justify-between  h-8 ">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-center justify-end md:justify-between ">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center space-x-6 lg:space-x-8 ">
        <div className="flex items-center space-x-2 justify-end ">
          <PaginationContent
            aria-label="pagination-prev"
            disabled={Number(searchParams?._offsetFrom || 0) === 0}
            pathname={pathname}
            search={
              '?' +
              new URLSearchParams({
                ...searchParams,
                _offset: `${prevStep}`,
              }).toString()
            }
          >
            <ChevronLeftIcon width={12} />
          </PaginationContent>
          <PaginationContent
            aria-label="pagination-last-next"
            disabled={totalElement < LIMIT_GET_POSTS}
            pathname={pathname}
            search={
              '?' +
              new URLSearchParams({
                ...searchParams,
                _offsetTo: `${nextStep}`,
              }).toString()
            }
          >
            <ChevronRightIcon width={12} />
          </PaginationContent>
        </div>
      </div>
    </div>
  );
}
