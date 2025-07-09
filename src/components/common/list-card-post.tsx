import React from 'react';
import { motion } from 'framer-motion';

import CardPostThumbnail from './card-post-thumbnail';

const ListCardPost = ({
  thumbnail,
  dummyPost,
}: {
  thumbnail: { title: string; description: string; image: string };
  dummyPost: { title: string; description: string; image: string }[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
      <div className="md:hidden">
        <CardPostThumbnail
          title={thumbnail.title}
          description={thumbnail.description}
          image={thumbnail.image}
        />
      </div>
      {dummyPost.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            bounce: 0.1,
            duration: 0.6,
          }}
          viewport={{ once: true, margin: '-40px' }}
          className="h-full w-full"
        >
          <CardPostThumbnail title={item.title} description={item.description} image={item.image} />
        </motion.div>
      ))}
    </div>
  );
};

export default ListCardPost;
