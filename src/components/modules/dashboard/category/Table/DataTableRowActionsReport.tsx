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
import DeleteCategory from '../deete-category';

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
          <DropdownMenuLabel>Action </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key={row.id}
            className="flex gap-2 items-center"
            onClick={() => setOpen(true)}
          >
            <Edit size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            key={row.id}
            className="flex gap-2 items-center"
            onClick={() => setOpenDelete(true)}
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCategory key={row.id} row={row} open={open} setOpen={setOpen} />
      <DeleteCategory key={row.id} row={row} isOpen={openDelete} setIsOpen={setOpenDelete} />
    </>
  );
}
