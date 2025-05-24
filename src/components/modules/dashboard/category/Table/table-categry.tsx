import { DataTable } from '@/components/DataTable/data-table';

import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';
import { useGetListCategory } from '@/querries/parameter/category';

export default function TableListCategory() {
  const { data, isFetching } = useGetListCategory();

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
