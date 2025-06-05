import { Button } from '@/components/ui/button';
import { formatedDateDDMMYYY } from '@/lib/utils';
import { useGetPostDetail } from '@/querries/posts/post';
import { CompletePost } from '@/schema/posts/post';
import { Edit3Icon } from 'lucide-react';
import { useState } from 'react';
import { Editor } from './EditDetailPost';
import LoadingArticle from './LoadingDetailArticle';
import ViewDetailPost from './ViewDetailPost';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailPostData = ({ row }: { row: CompletePost }) => {
  const { data, isLoading } = useGetPostDetail({ postId: row.id || '' });
  const [edit, setEdit] = useState(false);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-start">
        <div className=" w-8/12">
          <LoadingArticle />;
        </div>
      </div>
    );
  }
  if (!data) {
    return <div>No Data</div>;
  }
  if (edit) {
    return (
      <div key="editor-post" className="flex gap-4  w-full justify-center ">
        <div className="flex  pb-4 mb-4 w-8/12 ">
          <Editor
            key={edit ? 'edited' : 'notEdited'}
            row={row}
            detaiil_content={data}
            setEdit={setEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow h-[90vh]">
      <ScrollArea className="h-full rounded-lg ">
        <div key="view-post" className="flex flex-col gap-4    items-center ">
          <div className="flex flex-col gap-4  w-8/12  p-4">
            <div className="flex flex-col gap-2 border-b pb-4 mb-4 ">
              <div className="flex ">
                <h1 className="text-2xl font-bold capitalize w-3/4">{row.title}</h1>
                <div className="flex justify-end w-1/4">
                  <Button
                    className="gap-2"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <Edit3Icon size={14} /> Edit
                  </Button>
                </div>
              </div>

              <span className="text-sm text-gray-500">
                {row.username} - {row.category_name}
              </span>
              <span className="text-sm text-gray-500">
                {formatedDateDDMMYYY(row.created_at || '')} - {row?.reading_time} menit
              </span>
            </div>

            <div className="flex  gap-2  justify-center items-start overflow-x-auto ">
              <ViewDetailPost content={data?.content || ''} />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DetailPostData;
