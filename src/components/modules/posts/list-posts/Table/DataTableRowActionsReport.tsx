import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CompletePost } from '@/schema/posts/post';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { useState } from 'react';
import DetailPostData from './detail-post/DetailPostData';
import WrapperModalBase from '@/components/common/warpped-modal-create';

export function DataTableRowActionsReport({ row }: { row: CompletePost }) {
  const [openDetailArticle, setOpenDetailArticle] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal size={18} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2 items-center"
            onClick={() => {
              setOpenDetailArticle(true);
            }}
          >
            <Edit size={16} />
            Edit Detail Artikel {openDelete}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 items-center"
            onClick={() => {
              setOpenDelete(true);
            }}
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <WrapperModalBase open={openDetailArticle} setOpen={setOpenDetailArticle}>
        <DetailPostData row={row} />
      </WrapperModalBase>
    </>
  );
}
