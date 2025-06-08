import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/DataTable/data-table-view-options';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { FormEvent, SetStateAction, useRef, useState } from 'react';
import CreateNewCategory from '../create-category';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export function DataTableToolbar<TData>({ table, setSearch }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchValue, setSearchValue] = useState('');
  const refInputSearch = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearch(refInputSearch.current?.value ?? '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearch('');
    if (refInputSearch.current) {
      refInputSearch.current.value = '';
    }
  };

  const handleResetFilters = () => {
    table.resetColumnFilters();
    handleClearSearch();
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 z-10"
              width={14}
              height={14}
            />
            <Input
              ref={refInputSearch}
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search issues, projects, or people..."
              className="
                h-8
                w-[280px] 
                pl-9 
                pr-8
                text-sm 
                bg-background/80 
                border-border/60 
                shadow-sm 
                rounded-md
                transition-all 
                duration-200 
                ease-out
                placeholder:text-muted-foreground/50
                focus:border-border
                focus:shadow-md
                focus:bg-background
                hover:border-border/80
                hover:shadow-sm
              "
            />
            {searchValue && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="
                  absolute 
                  right-1 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  h-6 
                  w-6 
                  p-0 
                  hover:bg-muted/50
                  rounded-sm
                "
              >
                <Cross2Icon width={12} height={12} className="text-muted-foreground/60" />
              </Button>
            )}
          </div>
        </form>

        {/* Active filters indicator */}
        {isFiltered && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-px bg-border/40" />
            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className="
                h-8 
                px-3 
                text-xs 
                font-medium 
                bg-muted/30 
                hover:bg-muted/50 
                border 
                border-border/40 
                rounded-md
                transition-colors
                duration-150
              "
            >
              <span className="text-muted-foreground">Reset filters</span>
              <Cross2Icon width={12} height={12} className="ml-1.5 text-muted-foreground/60" />
            </Button>
          </div>
        )}
      </div>

      {/* Right section - View options */}
      <div className="flex items-center gap-2">
        <CreateNewCategory />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
