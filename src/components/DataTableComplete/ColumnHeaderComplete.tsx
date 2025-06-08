import { Column, Header } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  EyeNoneIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';

import { match } from 'ts-pattern';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  header: Header<TData, TValue>;
}

export function DataTableColumnHeaderComplete<TData, TValue>({
  column,
  title,
  className,
  header,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn('text-sm font-medium text-gray-700', className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8  hover:bg-gray-100 transition-colors duration-200 rounded-md border border-transparent  focus:outline-none focus-visible:ring-0 focus:ring-gray-300 px-1"
          >
            <div
              className="truncate overflow-hidden text-start"
              style={{ width: `calc(var(--header-${header.id}-size) * 1px - 16px` }}
            >
              <span className="text-[12px] font-[700]  text-start text-black-shadow/80 ">
                {title}
              </span>
            </div>
            {match(column.getIsSorted())
              .with('desc', () => (
                <ArrowDownIcon width={14} height={14} className="ml-1.5 text-gray-700" />
              ))
              .with('asc', () => (
                <ArrowUpIcon width={14} height={14} className="ml-1.5 text-gray-700" />
              ))
              .otherwise(() => (
                <CaretSortIcon width={14} height={14} className="ml-1.5 text-gray-400" />
              ))}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-white rounded-md shadow-lg border border-gray-200 py-1.5 "
        >
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="flex items-center px-3 py-1.5 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
          >
            <ArrowUpIcon className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
            ASC
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="flex items-center px-3 py-1.5 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
          >
            <ArrowDownIcon className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
            DESC
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
          {!header.isPlaceholder && header.column.getCanPin() && (
            <>
              {header.column.getIsPinned() ? (
                <DropdownMenuItem
                  className="flex items-center px-3 py-1.5 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
                  onClick={() => {
                    header.column.pin(false);
                  }}
                >
                  <DrawingPinIcon className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
                  Unpin Column
                </DropdownMenuItem>
              ) : null}
              {header.column.getIsPinned() !== 'right' ? (
                <DropdownMenuItem
                  onClick={() => {
                    header.column.pin('right');
                  }}
                  className="flex items-center px-3 py-1.5 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
                >
                  <DrawingPinFilledIcon className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
                  Pin to Right
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
            </>
          )}
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="flex items-center px-3 py-1.5 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer"
          >
            <EyeNoneIcon className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
            Hide Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
