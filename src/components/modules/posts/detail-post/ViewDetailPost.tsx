const ViewDetailPost = ({ content }: { content: string }) => {
  return (
    <div className="flex gap-8 relative min-h-screen">
      <article className="prose prose-sm flex-1 max-w-none">
        <div className="w-full" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};

export default ViewDetailPost;
