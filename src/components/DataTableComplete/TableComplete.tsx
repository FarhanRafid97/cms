import React, { useMemo } from 'react';

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  TableBody,
  TableCell,
  Table as TableComp,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { DataTableToolbarProps } from '@/types/globals';
import { match } from 'ts-pattern';
import PaginationNextOnly from './PaginationNext';

type TableBody<TData, TValue> = {
  table: Table<TData>;
  isFetching: boolean;
  columns: ColumnDef<TData, TValue>[];
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  DataTableToolbar: React.FC<DataTableToolbarProps<TData>>;
  pinedDefault?: string[];

  totalElement: number;
  // eslint-disable-next-line no-unused-vars
  isFetching: boolean;
}
function getCommonPinningStyles<T>(column: Column<T>): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: match(isLastLeftPinnedColumn)
      .with(true, () => '2.5px 0 4px -4px gray inset')
      .otherwise(() =>
        match(isFirstRightPinnedColumn)
          .with(true, () => '2.5px 0 4px -4px gray inset')
          .otherwise(() => ''),
      ),

    paddingLeft: isFirstRightPinnedColumn ? '30px' : '0px',
    paddingRight: isFirstRightPinnedColumn ? '30px' : '0px',
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
  };
}
export function DataTableComplete<TData, TValue>({
  columns,
  data,
  DataTableToolbar,

  pinedDefault = [],

  isFetching = false,
  totalElement,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,

      columnVisibility,
      rowSelection,
      globalFilter: search,
      columnFilters,
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 600,
      size: 120,
    },
    initialState: {
      columnPinning: {
        right: pinedDefault,
      },
    },
    columnResizeMode: 'onChange',
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearch,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};

    for (const header of headers) {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }

    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo]);

  const isSizing = useMemo(() => {
    return table.getState().columnSizingInfo.isResizingColumn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo.isResizingColumn]);

  return (
    <div className={cn(' space-y-3 ')}>
      <div className="px-6 pt-3">
        {DataTableToolbar ? <DataTableToolbar table={table} setSearch={setSearch} /> : null}
      </div>
      <div className="rounded-none overflow-hidden border-t border-b p-[1px]">
        <TableComp
          style={{
            ...columnSizeVars,
          }}
        >
          <TableHeader>
            {!!table.getRowModel().rows?.length ? (
              table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id} className="tr ">
                    {headerGroup.headers.map((header, idx) => {
                      return (
                        <TableHead
                          scope="col"
                          className={cn(
                            header.column.getIsPinned() ? ' bg-background/80 backdrop-blur' : '',
                          )}
                          style={{
                            ...getCommonPinningStyles(header.column),
                            width: `calc(var(--header-${header?.id}-size) * 1px)`,
                            paddingLeft: idx === 0 ? '1.5rem' : '0px',
                            paddingRight: '1.5rem',
                          }}
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {!header.column.getCanResize() ? null : (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              {...{
                                onDoubleClick: () => header.column.resetSize(),

                                className: `resizer  ${
                                  header.column.getIsResizing() ? 'isResizing' : ''
                                }`,
                              }}
                            >
                              <div className="w-[2px] h-full bg-gray-300 rounded-sm" />
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableHead></TableHead>
              </TableRow>
            )}
          </TableHeader>

          {isSizing ? (
            <MemoizedTableBody table={table} columns={columns} isFetching={isFetching || false} />
          ) : (
            <TableBodyComp table={table} columns={columns} isFetching={isFetching || false} />
          )}
        </TableComp>
      </div>
      <div className="px-6">
        <PaginationNextOnly isFetching={isFetching} totalElement={totalElement} />
      </div>
    </div>
  );
}

export const MemoizedTableBody = React.memo(TableBodyComp) as <TData, TValue>(
  // eslint-disable-next-line no-unused-vars
  props: TableBody<TData, TValue>,
) => JSX.Element;

function TableBodyComp<TData, TValue>({ table, isFetching, columns }: TableBody<TData, TValue>) {
  const tableRow = table.getRowModel().rows;
  return (
    <TableBody>
      {match(isFetching)
        .with(true, () => <LoadingRows table={table} />)
        .otherwise(() =>
          match(!!tableRow?.length)
            .with(true, () =>
              tableRow?.map((row) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                const { isNew, isUpdate, isError } = row.original;

                return (
                  <TableRow className="group" key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            `group-hover:bg-secondary bg-background`,
                            isNew &&
                              'bg-green-50 text-black group-hover:bg-emerald-100 group-hover:text-emebg-emerald-900',
                            isUpdate &&
                              'bg-blue-50 text-black group-hover:bg-sky-100 group-hover:text-sky-900',
                            isError &&
                              'bg-[#FCF4F4]  text-black group-hover:bg-rose-100 group-hover:text-rose-900',
                          )}
                          style={{
                            ...getCommonPinningStyles(cell.column),
                            width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }),
            )
            .otherwise(() => (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )),
        )}
    </TableBody>
  );
}

function LoadingRows<TData>({ table }: { table: Table<TData> }) {
  return (
    <>
      {[...Array(10)].map((_, index) =>
        table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={`${headerGroup.id}-${index}`}>
            {headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                className={cn(
                  '  animate-pulse h-6  bg-gray-300',
                  `animation-delay-[${400 + index * 50}ms]`,
                )}
                colSpan={header.colSpan}
              ></TableCell>
            ))}
          </TableRow>
        )),
      )}
    </>
  );
}
