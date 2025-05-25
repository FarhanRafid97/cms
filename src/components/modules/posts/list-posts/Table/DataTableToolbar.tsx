import { DataTableViewOptions } from '@/components/DataTable/data-table-view-options';
import { Table } from '@tanstack/react-table';
import { SetStateAction } from 'react';
import { AddNewPosts } from './AddNewPosts';
import SearchTableData from './SearchTableData';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <SearchTableData />
      </div>

      {/* Right section - View options */}
      <div className="flex items-center gap-2">
        <AddNewPosts />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
