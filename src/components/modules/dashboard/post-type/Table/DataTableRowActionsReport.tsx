import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PostType } from '@/schema/posts/post';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

export function DataTableRowActionsReport({ row }: { row: PostType }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={18} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Action {row.id} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 items-center">
            <Edit size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
