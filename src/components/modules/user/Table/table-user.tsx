import { DataTable } from '@/components/DataTable/data-table';

import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';
import { useGetListUser } from '@/querries/user/user';

export default function TableListUser() {
  const { data, isFetching } = useGetListUser();

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
