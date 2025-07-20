import { useIsMobile } from '@/hooks/use-mobile';
import { useGetPostDetail } from '@/querries/posts/post';
import { useRightSidebarStore } from '@/store/right-sidebar';
import { LayersIcon } from '@radix-ui/react-icons';
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
    <div className="w-full flex h-fit ">
      {/* Left content: scrollable */}

      <div className="flex-1 h-[calc(100vh-5rem) w-full relative ease">
        {' '}
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex gap-2 items-center min-w-0">
            <LayersIcon className="w-6 h-6" />
            <h1 className="text-4xl text-foreground truncate capitalize">{data.title}</h1>
          </div>
        </div>
        <Editor id={id} complete_detail_post={data} />
      </div>

      {/* Right sidebar: sticky */}

      <SideContent isMobile={isMobile} setIsEdit={setIsOpen} isEdit={isOpen} data={data} />
    </div>
  );
};
