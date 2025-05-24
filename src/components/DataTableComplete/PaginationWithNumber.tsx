import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDynamicUrl } from '@/hooks/useGetDyanmicUrl';
import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { StateSearchParam } from '@/types/globals';
import { Table } from '@tanstack/react-table';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import {
  DotsHorizontalIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
interface DataTablePaginationProps<TData> {
  table: Table<TData>;

  totalPage: number;
  totalElement: number;
  isFetching: boolean;
  statePagination: StateSearchParam;
}

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

export default function PaginationWithNumber<TData>({
  statePagination,
  table,
  totalElement,
  totalPage,
  isFetching,
}: DataTablePaginationProps<TData>) {
  const { pathname } = useGetDynamicUrl();
  const { search: searchParams } = useGetFilterSearchparams();
  const { push } = useRouter();

  const pageNumbers = [];
  const currentPage = statePagination.page;
  const maxPageNumbers = 5;

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const showDots = totalPage > maxPageNumbers;

  let startPage, endPage;
  if (showDots) {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = maxPageNumbers;
    } else if (currentPage + 2 >= totalPage) {
      startPage = totalPage - maxPageNumbers + 2;
      endPage = totalPage;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  } else {
    startPage = 1;
    endPage = totalPage;
  }
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
        <div className="flex items-center space-x-2">
          <p className="hidden sm:block text-sm font-medium">Showing</p>
          <Select
            value={`${statePagination.limit}`}
            onValueChange={(value) => {
              push(
                pathname +
                  '?' +
                  new URLSearchParams({
                    ...searchParams,
                    _page: '1',
                    _limit: `${value}`,
                  }).toString(),
                {
                  scroll: false,
                },
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  disabled={totalElement + 10 < pageSize}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden sm:block text-sm font-medium">
            {' '}
            of {totalElement} Records {`(Page ${statePagination.page} of ${totalPage})`}
          </p>
        </div>

        <div className="flex items-center space-x-2 justify-end ">
          <ul className="pagination-container flex h-fit items-center gap-1  ">
            <li className="flex items-center gap-1">
              <PaginationContent
                aria-label="pagination-last-prev"
                disabled={currentPage === 1}
                pathname={pathname}
                search={
                  '?' +
                  new URLSearchParams({
                    ...searchParams,
                    _page: `${1}`,
                  }).toString()
                }
              >
                <DoubleArrowLeftIcon width={12} height={12} />
              </PaginationContent>

              <PaginationContent
                aria-label="pagination-prev"
                disabled={currentPage === 1}
                pathname={pathname}
                search={
                  '?' +
                  new URLSearchParams({
                    ...searchParams,
                    _page: `${Number(searchParams._page) - 1}`,
                  }).toString()
                }
              >
                <ChevronLeftIcon width={12} />
              </PaginationContent>
            </li>

            {showDots && startPage > 1 && (
              <li className="page-item disabled px-1">
                <DotsHorizontalIcon className="text-gray-300" />
              </li>
            )}

            {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
              <li key={pageNumber}>
                <PaginationContent
                  aria-label={`pagination-number-${pageNumber}`}
                  isSelected={pageNumber === currentPage}
                  pathname={pathname}
                  search={
                    '?' +
                    new URLSearchParams({
                      ...searchParams,
                      _page: pageNumber + '',
                    }).toString()
                  }
                >
                  <span className="!text-[10px]">{pageNumber}</span>
                </PaginationContent>
              </li>
            ))}

            {showDots && endPage < totalPage && (
              <li className="page-item disabled text-gray-300 px-1">
                <DotsHorizontalIcon />
              </li>
            )}

            <li className="flex gap-1" style={{ display: 'flex' }}>
              <PaginationContent
                aria-label="pagination-last-next"
                disabled={currentPage === totalPage}
                pathname={pathname}
                search={
                  '?' +
                  new URLSearchParams({
                    ...searchParams,
                    _page: `${Number(searchParams._page) + 1}`,
                  }).toString()
                }
              >
                <ChevronRightIcon width={12} />
              </PaginationContent>
              <PaginationContent
                aria-label="pagination-next"
                disabled={currentPage === totalPage}
                pathname={pathname}
                search={
                  '?' +
                  new URLSearchParams({
                    ...searchParams,
                    _page: totalPage + '',
                  }).toString()
                }
              >
                <DoubleArrowRightIcon width={12} height={12} />
              </PaginationContent>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
