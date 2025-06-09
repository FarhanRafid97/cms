import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Author } from '@/schema/user/author';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

export function DataTableRowActionsReport({ row }: { row: Author }) {
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
    </>
  );
}
