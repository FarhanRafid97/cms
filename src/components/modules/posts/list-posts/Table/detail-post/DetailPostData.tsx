import { useGetPostDetail } from '@/querries/posts/post';
import { CompletePost } from '@/schema/posts/post';
import ViewDetailPost from './ViewDetailPost';
import { Button } from '@/components/ui/button';
import { Edit3Icon } from 'lucide-react';
import LoadingArticle from './LoadingDetailArticle';

const DetailPostData = ({ row }: { row: CompletePost }) => {
  const { data, isLoading } = useGetPostDetail({ postId: row.id || '' });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-start">
        <div className=" w-8/12">
          <LoadingArticle />;
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4   items-center ">
      <div className="flex flex-col gap-4  w-8/12">
        <div className="flex flex-col gap-2 border-b pb-4 mb-4 ">
          <div className="flex ">
            <h1 className="text-2xl font-bold capitalize w-3/4">{row.title}</h1>
            <div className="flex justify-end w-1/4">
              <Button className="gap-2">
                <Edit3Icon size={14} /> Edit
              </Button>
            </div>
          </div>

          <span className="text-sm text-gray-500">
            {row.username} - {row.category_name}
          </span>
          <span className="text-sm text-gray-500">
            {row.published_at} - {row?.reading_time} menit
          </span>
        </div>
        <ViewDetailPost content={data?.content || ''} />
        <div className="flex flex-col gap-2"></div>
      </div>
    </div>
  );
};

export default DetailPostData;
