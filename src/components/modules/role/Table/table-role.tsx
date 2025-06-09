import { DataTable } from '@/components/DataTable/data-table';

import { useGetListRole } from '@/querries/user/role';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';

export default function TableRole() {
  const { data, isFetching } = useGetListRole();

  return (
    <div className="w-full flex flex-col">
      <DataTable
        DataTableToolbar={DataTableToolbar}
        isFetching={isFetching}
        data={data || []}
        pinedDefault={['actions']}
        columns={columns}
      />
    </div>
  );
}
