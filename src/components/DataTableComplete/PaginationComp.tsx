import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;

  totalPage: number;
  totalElement: number;
  statePagination: StateSearchParam;
}

interface LinkWrapperProps {
  href: string;
  disabled?: boolean;
  children?: ReactNode;
  passHref?: boolean;
  className?: string;
}
const LinkWrapper = ({ children, href, disabled, passHref, ...props }: LinkWrapperProps) => {
  if (disabled)
    return (
      <Button variant="outline" className="h-8 w-8 p-0 flex" disabled={disabled} {...props}>
        {children}
      </Button>
    );

  return (
    <Link scroll={false} href={href} passHref={passHref} {...props}>
      <Button variant="outline" className="h-8 w-8 p-0 flex">
        {children}
      </Button>
    </Link>
  );
};

export function PaginationComp<TData>({
  table,
  statePagination,
  totalPage,
  totalElement,
}: DataTablePaginationProps<TData>) {
  const { pathname } = useGetDynamicUrl();
  const { search } = useGetFilterSearchparams();
  const { push } = useRouter();

  return (
    <div className="flex items-center justify-end md:justify-between px-2">
      <div className="hidden sm:block flex-1 text-sm text-muted-foreground">
        {totalElement} Total data
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 ">
        <div className="flex items-center space-x-2">
          <p className="hidden sm:block text-sm font-medium">Rows per page</p>

          <Select
            value={`${statePagination.limit}`}
            onValueChange={(value) => {
              push(
                pathname +
                  '?' +
                  new URLSearchParams({ ...search, _page: '1', _limit: `${value}` }).toString(),
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
        </div>
        <div className="hidden sm:block md:flex w-[100px] items-center justify-center text-sm font-medium">
          Page {search._page} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <LinkWrapper
            href={pathname + '?' + new URLSearchParams({ ...search, _page: `1` }).toString()}
            disabled={search._page === '1'}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </LinkWrapper>

          <LinkWrapper
            href={
              pathname +
              '?' +
              new URLSearchParams({ ...search, _page: `${Number(search._page) - 1}` }).toString()
            }
            disabled={search._page === '1'}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </LinkWrapper>

          <LinkWrapper
            href={
              pathname +
              '?' +
              new URLSearchParams({ ...search, _page: `${Number(search._page) + 1}` }).toString()
            }
            disabled={search._page === `${totalPage}`}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </LinkWrapper>

          <LinkWrapper
            href={
              pathname + '?' + new URLSearchParams({ ...search, _page: `${totalPage}` }).toString()
            }
            disabled={search._page === `${totalPage}`}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </LinkWrapper>
        </div>
      </div>
    </div>
  );
}
