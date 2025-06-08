import { DataTable } from '@/components/DataTable/data-table';

import { useGetListPostType } from '@/querries/parameter/post-type';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';

export default function TableListPostType() {
  const { data, isFetching } = useGetListPostType();

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
