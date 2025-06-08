import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PostType } from '@/schema/paramter/post-type';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import EditPostType from '../edit-post-type';
import { useState } from 'react';

export function DataTableRowActionsReport({ row }: { row: PostType }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={18} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
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
      <EditPostType row={row} open={open} setOpen={setOpen} />
    </>
  );
}
