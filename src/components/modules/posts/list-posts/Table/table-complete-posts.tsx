import { DataTableComplete } from '@/components/DataTableComplete/TableComplete';
import { useGetCompletePosts } from '@/querries/posts/post';
import { DataTableToolbar } from './DataTableToolbar';
import { columns } from './columns';
import { useSearchParamsClient } from '@/store/searchParams';
import { useGetPostTypeId } from '@/hooks/use-get-lastpath';
import { useAuth } from '@/context/Auth';

export default function TableListPosts() {
  const { user } = useAuth();
  const { searchParams } = useSearchParamsClient();
  const postTypeSelected = useGetPostTypeId();

  const { data, isFetching } = useGetCompletePosts({
    offsetFrom: Number(searchParams?._offsetFrom || 0),
    offsetTo: Number(searchParams?._offsetTo),
    post_type_id: postTypeSelected.id,
    author_id: user?.detail_user?.id || '',
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
