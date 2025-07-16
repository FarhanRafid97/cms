import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { Role } from '@/schema/user/role';

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'id',
    enableResizing: false,
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
    accessorKey: 'role',
    enableResizing: false,
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Role Name" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.role}</TableCellCostume>
    ),
  },
];
