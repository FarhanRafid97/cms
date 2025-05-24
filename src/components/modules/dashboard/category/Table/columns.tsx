import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { Category } from '@/schema/posts/post';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'ID',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="ID" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.id}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Name" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.name}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Description" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.description}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'flag',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Flag" />
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
