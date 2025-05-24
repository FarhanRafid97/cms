import { DataTable } from '@/components/DataTable/data-table';

import { useGetListTag } from '@/querries/parameter/tags';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';

export default function TableListTag() {
  const { data, isFetching } = useGetListTag();

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
