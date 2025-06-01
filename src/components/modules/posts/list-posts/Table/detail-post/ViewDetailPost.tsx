import React from 'react';

const ViewDetailPost = ({ content }: { content: string }) => {
  return (
    <article className="prose lg:prose-sm">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default ViewDetailPost;
