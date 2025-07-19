import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useGetPostDetail } from '@/querries/posts/post';
import { useRightSidebarStore } from '@/store/right-sidebar';
import { Pencil } from 'lucide-react';
import { Editor } from './EditDetailPost';
import LoadingArticle from './LoadingDetailArticle';
import { SideContent } from './SideContent';

export const PageDetailPost = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetPostDetail({ postId: id });
  const { isOpen, setIsOpen } = useRightSidebarStore();
  const isMobile = useIsMobile();

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

  return (
    <div className="w-full flex ">
      {/* Left content: scrollable */}

      <div className="flex-1 h-[calc(100vh-2rem) w-full  relative ease">
        {' '}
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg text-foreground truncate capitalize">{data.title}</h2>
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <Editor id={id} complete_detail_post={data} />
      </div>

      {/* Right sidebar: sticky */}

      <SideContent isMobile={isMobile} setIsEdit={setIsOpen} isEdit={isOpen} />
    </div>
  );
};
