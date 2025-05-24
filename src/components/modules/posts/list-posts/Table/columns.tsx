import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { formatedDateDDMMYYY } from '@/lib/utils';
import { CompletePost } from '@/schema/posts/post';

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
    accessorKey: 'slug',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Slugs" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.slug}</TableCellCostume>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
  },
];
