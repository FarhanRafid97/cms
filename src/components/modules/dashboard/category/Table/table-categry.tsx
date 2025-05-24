import { DataTable } from '@/components/DataTable/data-table';

import { useGetGLProtect } from '@/querries/parameter/use-gl-protect';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';

export default function TableGLProtect() {
  const { data, isFetching } = useGetGLProtect();

  return (
    <div className="w-full flex flex-col">
      <DataTable
        DataTableToolbar={DataTableToolbar}
        isFetching={isFetching}
        data={data?.data || []}
        pinedDefault={['actions']}
        columns={columns}
      />
    </div>
  );
}
