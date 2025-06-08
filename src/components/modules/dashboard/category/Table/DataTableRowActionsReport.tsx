import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/schema/paramter/category';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import EditCategory from '../edit-category';
import { useState } from 'react';

export function DataTableRowActionsReport({ row }: { row: Category }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={18} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Action {row.id}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 items-center" onClick={() => setOpen(true)}>
            <Edit size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCategory row={row} open={open} setOpen={setOpen} />
    </>
  );
}
