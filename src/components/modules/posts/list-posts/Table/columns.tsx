import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { cn, formatedDateDDMMYYY, getStatusConfig, getStatusIcon } from '@/lib/utils';
import { CompletePost } from '@/schema/posts/post';
import { Hash } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<CompletePost>[] = [
  {
    accessorKey: 'ID',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="ID" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume className="ml-6" id={column.id}>
        {row.original.id}
      </TableCellCostume>
    ),
    size: 60,
  },

  {
    accessorKey: 'featured_image_url',
    enableResizing: false,
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Thumbnail" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        <AspectRatio ratio={16 / 8} className="bg-secondary/40 rounded border w-11/12 h-3/4">
          <Image
            src={
              row.original.featured_image_url
                ? row.original.featured_image_url
                : '/no-image-placeholder.svg'
            }
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-contain"
          />
        </AspectRatio>
      </TableCellCostume>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Judul" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.title}</TableCellCostume>
    ),
  },

  {
    accessorKey: 'username',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Penulis" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.username}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Kategori" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id} className="">
        <div className="text-primary font-medium w-fit px-1 rounded flex gap-1 items-center">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: row.original.category_color || '' }}
          ></div>
          <span>{row.original.category_name}</span>
        </div>
      </TableCellCostume>
    ),
  },
  {
    accessorKey: 'slug',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Tag" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        <div className="min-w-[400px] flex flex-wrap gap-1">
          {row.original.slug?.split(',').map((s) => {
            return (
              <Badge variant="outline" key={s} className="gap-1">
                <Hash size={10} className="text-emerald-500" />
                {s}
              </Badge>
            );
          })}
        </div>
      </TableCellCostume>
    ),
    size: 140,
  },

  {
    accessorKey: 'status',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Status" />
    ),
    cell: ({ row, column }) => {
      const status = row.original.status;
      const color = getStatusConfig(status || '');
      const Icon = getStatusIcon(status || '');
      return (
        <TableCellCostume id={column.id}>
          <Badge
            variant="outline"
            className={cn(
              'gap-1 capitalize  font-medium',
              color.borderColor,
              color.bgColor,
              color.textColor,
            )}
          >
            <Icon size={10} className={`${color.textColor}`} />
            {status}
          </Badge>
        </TableCellCostume>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Tanggal Pembuatan" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        {formatedDateDDMMYYY(row?.original?.created_at || '')}
      </TableCellCostume>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
    size: 80,
    enableResizing: false,
  },
];
