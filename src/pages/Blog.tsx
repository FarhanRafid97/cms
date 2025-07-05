import CardPostThumbnail from '@/components/common/card-post-thumbnail';
import ToolbarFilter from '@/components/common/toolbar-filter';
import LayoutSection from '@/components/modules/home-page/layout-section';
import { Button } from '@/components/ui/button';
import { dummyPost } from '@/lib/options-default';
import { motion } from 'motion/react';

const Page = () => {
  return (
    <LayoutSection>
      <div className="container mx-auto min-h-screen flex flex-col gap-6">
        <div className="mt-8 grid md:grid-cols-3 gap-6 grid-cols-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
            }}
            className="col-span-2"
          >
            <h1 className="text-4xl font-bold">Blog</h1>
            <h2 className="text-md  font-[400] text-muted-foreground mt-4">
              Blog terbaru dari Cagak.id
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="col-span-1 flex md:justify-end justify-start gap-2"
          >
            <Button className=" px-2 py-1 rounded-xl text-sm">
              <span>Cerita</span>
            </Button>
            <Button variant="outline" className=" px-2 py-1 rounded-xl text-sm">
              <span>Berita</span>
            </Button>
            <Button variant="outline" className=" px-2 py-1 rounded-xl text-sm">
              <span>Artikel</span>
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {dummyPost.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 0.4,
                delay: 0.2,
              }}
            >
              <CardPostThumbnail
                title={item.title}
                description={item.description}
                image={item.image}
                date={item.date}
                isLast={index === dummyPost.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <ToolbarFilter />
    </LayoutSection>
  );
};

export default Page;
