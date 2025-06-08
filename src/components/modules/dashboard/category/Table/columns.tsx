import { ColumnDef } from '@tanstack/react-table';

import { TableCellCostume } from '@/components/DataTableComplete/CellBaseComp';
import { DataTableColumnHeaderComplete } from '@/components/DataTableComplete/ColumnHeaderComplete';

import { DataTableRowActionsReport } from './DataTableRowActionsReport';

import { Category } from '@/schema/paramter/category';

export const columns: ColumnDef<Category>[] = [
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
      <DataTableColumnHeaderComplete header={header} column={column} title="Nama Kategori" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.name}</TableCellCostume>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Deskripsi" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>{row.original.description}</TableCellCostume>
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
    accessorKey: 'color',
    header: ({ column, header }) => (
      <DataTableColumnHeaderComplete header={header} column={column} title="Warna" />
    ),
    cell: ({ row, column }) => (
      <TableCellCostume id={column.id}>
        <div
          className="w-6 h-6 rounded border border-border"
          style={{ backgroundColor: row.original.color || '' }}
        />
      </TableCellCostume>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsReport row={row.original} />,
  },
];
