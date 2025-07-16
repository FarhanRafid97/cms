import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CompletePost } from '@/schema/posts/post';

import { MoreHorizontal, Search, Trash } from 'lucide-react';
import Link from 'next/link';

export function DataTableRowActionsReport({ row }: { row: CompletePost }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={18} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/dashboard/post/detail/${row.id}`}>
            <DropdownMenuItem className="flex gap-2 items-center">
              <Search size={16} />
              Detail Artikel
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
