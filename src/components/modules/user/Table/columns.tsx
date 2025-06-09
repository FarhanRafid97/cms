import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { Author } from '@/schema/user/author';
import { formatedDateDDMMYYY } from '@/lib/utils';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: 'id',
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
    accessorKey: 'email',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Email" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.email}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Nama Pengguna" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.username}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'first_name',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Nama Depan" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.first_name}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Nama Belakang" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.last_name}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'bio',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Bio" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.bio}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'bio',
    enableResizing: false,
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Active" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        {row.original.is_active ? <Check size={16} color="green" /> : <X size={16} color="red" />}
      </TableCellCostume>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Tanggal Bergabung" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        {formatedDateDDMMYYY(row.original.created_at || '', true)}
      </TableCellCostume>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
  },
];
