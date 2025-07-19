import CardPostThumbnail from '@/components/common/card-post-thumbnail';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import LayoutSection from '../home-page/layout-section';

const NewestArticle = ({
  dummyPost,
  label,
}: {
  dummyPost: { title: string; description: string; image: string }[];
  label: string;
}) => {
  return (
    <LayoutSection className="py-8">
      <p className="w-fit text-4xl font-bold p-1  border-b-2 border-black"> {label}</p>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
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
              <CardPostThumbnail
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
        <Button className="flex items-center gap-2 md:w-fit w-full">
          <p>Lihat Semua </p>
          <ArrowUpRight />
        </Button>
      </div>
    </LayoutSection>
  );
};

export default NewestArticle;
