import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { Tag } from '@/schema/paramter/tag';
import { formatedDateDDMMYYY } from '@/lib/utils';

export const columns: ColumnDef<Tag>[] = [
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
    accessorKey: 'name',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Name" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.name}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'slug',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Slug" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.slug}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Created At" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        {formatedDateDDMMYYY(row.original.created_at || new Date().toISOString())}
      </TableCellCostume>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
  },
];
