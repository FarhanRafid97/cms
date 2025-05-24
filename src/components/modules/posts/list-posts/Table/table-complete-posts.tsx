import { DataTableComplete } from '@/components/DataTableComplete/TableComplete';
import { useGetCompletePosts } from '@/querries/posts/post';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';
import { useSearchParamsClient } from '@/store/searchParams';

export default function TableListPosts() {
  const { searchParams } = useSearchParamsClient();
  console.log('searchParams post', searchParams);
  const { data, isFetching } = useGetCompletePosts({
    offsetFrom: Number(searchParams?._offsetFrom || 0),
    offsetTo: Number(searchParams?._offsetTo),
  });

  return (
    <div className="w-full flex flex-col">
      <DataTableComplete
        DataTableToolbar={DataTableToolbar}
        isFetching={isFetching}
        data={data?.data || []}
        pinedDefault={['actions']}
        columns={columns}
        totalElement={data?.totalData || 0}
      />
    </div>
  );
}
