import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatedDateDDMMYYY } from '@/lib/utils';
import { useGetPostDetail } from '@/querries/posts/post';
import { CompletePost } from '@/schema/posts/post';
import { Edit3Icon } from 'lucide-react';
import { useState } from 'react';
import { Editor } from './EditDetailPost';
import LoadingArticle from './LoadingDetailArticle';
import ViewDetailPost from './ViewDetailPost';

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
    <div className="flex h-full">
      <div key="view-post" className="flex flex-col gap-4 items-center w-full">
        <div className="flex flex-col gap-4  w-full p-1 md:p-0 md:w-8/12">
          <div className="grid grid-cols-4 w-full border-b pb-4">
            <div className="col-span-3 grid grid-cols-1 gap-1">
              <h1 className="text-sm font-bold capitalize w-3/4 mb-2">{row.title}</h1>
              <span className="text-xs text-gray-500">
                {row.username} - {row.category_name}
              </span>
              <span className="text-xs text-gray-500">
                {formatedDateDDMMYYY(row.created_at || '')} - {row?.reading_time} menit
              </span>
            </div>
            <div className="col-span-1 flex justify-end">
              <Button
                className="gap-2 ml-auto"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <Edit3Icon size={14} /> Edit
              </Button>
            </div>
          </div>

          <div className="h-[calc(100vh-200px)] overflow-hidden">
            <ScrollArea className="h-full w-full p-1">
              <ViewDetailPost content={data?.content || ''} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPostData;
