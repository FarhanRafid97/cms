import React from 'react';
import TableOfContents from './TableOfContents';

const ViewDetailPost = ({ content }: { content: string }) => {
  return (
    <div className="flex gap-8">
      <article className="prose prose-sm flex-1 max-w-none">
        <div className="w-full" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <div className="hidden lg:block sticky top-4 h-fit">
        <TableOfContents content={content} />
      </div>
    </div>
  );
};

export default ViewDetailPost;
