import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { formatedDateDDMMYYY } from '@/lib/utils';
import { CompletePost } from '@/schema/posts/post';
import { Badge } from '@/components/ui/badge';

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
    accessorKey: 'title',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Title" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.title}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Author" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.username}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'slug',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Slugs" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        <div className="min-w-[400px] flex flex-wrap gap-2">
          {row.original.slug?.split(',').map((s) => {
            return <Badge key={s}>{s}</Badge>;
          })}
        </div>
      </TableCellCostume>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Slugs" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        <div
          className={`text-white/80 font-medium w-fit px-1 rounded`}
          style={{ backgroundColor: row.original.category_color || '' }}
        >
          {row.original.category_name}
        </div>
      </TableCellCostume>
    ),
  },

  {
    accessorKey: 'created_at',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Created At" />
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
  },
];
