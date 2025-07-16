import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { PostType } from '@/schema/paramter/post-type';

export const columns: ColumnDef<PostType>[] = [
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
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
  },
];
