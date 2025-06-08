import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { Columns, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

function formatColumnName(columnId: string) {
  return columnId
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const allColumn = table.getAllColumns();

  const visibleColumns = allColumn.filter((column) => column.getIsVisible());

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex items-center gap-2  text-primary hover:text-primary hover:bg-muted transition-all',
            isOpen && ' border-secondary',
          )}
        >
          <Columns className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Columns</span>
          {visibleColumns.length > 0 && (
            <Badge variant="outline" className="ml-1 bg-gray-100 text-gray-700 border-gray-200">
              {visibleColumns.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-0 border  shadow-lg rounded-lg overflow-hidden"
      >
        <div className="px-4 py-3 border-b  flex items-center justify-between bg-background">
          <DropdownMenuLabel className="text-sm font-medium text-primary p-0">
            Table Columns
          </DropdownMenuLabel>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-md text-primary"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-[300px] overflow-auto">
          <div className="p-2">
            {allColumn.length === 0 ? (
              <div className="text-center p-4 text-sm text-primary">
                No configurable columns available
              </div>
            ) : (
              <div className="space-y-1">
                {table.getAllColumns().map((column) => {
                  const isVisible = column.getIsVisible();

                  const isShowColumn =
                    typeof column.accessorFn !== 'undefined' && column.getCanHide();
                  if (!isShowColumn) {
                    return null;
                  }
                  return (
                    <div
                      key={column.id}
                      className={cn(
                        'flex items-center py-1.5 px-2 rounded-md transition-all cursor-pointer hover:bg-secondary',
                        isVisible && 'bg-secondary hover:bg-secondary/80',
                      )}
                      onClick={() => {
                        column.toggleVisibility();
                      }}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="mr-2 h-4 flex items-center justify-center">
                          <Checkbox
                            checked={isVisible}
                            className="rounded-sm data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                        <span className="text-sm truncate">{formatColumnName(column.id)}</span>
                      </div>

                      <div className="ml-2 flex items-center">
                        {isVisible ? (
                          <Eye className="h-3.5 w-3.5 text-gray-500" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 text-gray-300" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
