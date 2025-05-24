import React, { CSSProperties, useMemo } from 'react';

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

import { DataTableToolbarProps, FilterSearchParams, StateSearchParam } from '@/types/globals';
import { match } from 'ts-pattern';
import PaginationWithNumber from './PaginationWithNumber';

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
  searchParams?: FilterSearchParams;

  statePagination: StateSearchParam;
  totalPage: number | undefined;
  totalElement: number;
  id?: string;
  // eslint-disable-next-line no-unused-vars
  isFetching: boolean;
}

function getCommonPinningStyles<T>(column: Column<T>, isHeader?: boolean): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: match(isLastLeftPinnedColumn)
      .with(true, () => '-4px 0 4px -4px gray inset')
      .otherwise(() =>
        match(isFirstRightPinnedColumn)
          .with(true, () => '4px 0 4px -4px gray inset')
          .otherwise(() => ''),
      ),

    paddingLeft: isFirstRightPinnedColumn ? '30px' : isHeader ? '0px' : '10px',
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
  searchParams,
  pinedDefault = [],
  id,
  statePagination,

  totalPage,
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
    <div className="space-y-4">
      <div>
        {DataTableToolbar ? (
          <DataTableToolbar
            isPending={isFetching}
            id={`${id}`}
            searchParams={searchParams}
            table={table}
            setSearch={setSearch}
          />
        ) : null}
      </div>
      <div className="rounded-md overflow-hidden border p-[1px]">
        <TableComp
          className="w-full "
          style={{
            ...columnSizeVars,
          }}
        >
          <TableHeader>
            {!!table.getRowModel().rows?.length ? (
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="tr ">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      key={header.id}
                      className={cn(
                        header.column.getIsPinned() ? ' bg-background/80 backdrop-blur' : '',
                      )}
                      style={{
                        ...getCommonPinningStyles(header.column, true),
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.id === 'actions' ? null : (
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),

                            className: `resizer ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                          }}
                        >
                          <div className="w-[2px] h-full bg-gray-300 rounded-sm" />
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))
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
      <PaginationWithNumber
        isFetching={isFetching}
        totalElement={totalElement}
        table={table}
        statePagination={statePagination}
        totalPage={totalPage ?? 1}
      />
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
      {[...Array(20)].map((_, index) =>
        table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={`${headerGroup.id}-${index}`}>
            {headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                className={cn(
                  '  animate-pulse h-7  bg-gray-300',
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
