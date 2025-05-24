import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableViewOptions } from '@/components/DataTable/data-table-view-options';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { FormEvent, SetStateAction, useRef } from 'react';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export function DataTableToolbar<TData>({ table, setSearch }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const refInputSearch = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSearch(refInputSearch.current?.value ?? '');
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              ref={refInputSearch}
              placeholder="Search GL Protect..."
              className="h-8 w-[150px] lg:w-[250px] border-input"
            />
            <Button variant="outline" size="icon" className="h-8" type="submit">
              <MagnifyingGlassIcon width={16} height={16} />
            </Button>
          </div>
        </form>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon width={16} height={16} className="ml-2" />
          </Button>
        )}
      </div>
      <div className="mr-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
