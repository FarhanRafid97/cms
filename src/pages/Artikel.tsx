import ListCardPost from '@/components/common/list-card-post';
import TextWrapedBorder from '@/components/common/text-wrapped';
import ToolbarFilter from '@/components/common/toolbar-filter';
import LayoutSection from '@/components/modules/home-page/layout-section';
import { dummyPost } from '@/lib/options-default';
import { motion } from 'motion/react';

const Page = () => {
  return (
    <LayoutSection>
      <div className="container mx-auto min-h-screen flex flex-col gap-6">
        <motion.div
          className="flex flex-col gap-2 items-center justify-center md:mb-8 "
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="md:text-6xl text-2xl font-bold mb-2 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            List Artikel
            <TextWrapedBorder className="w-fit">Pilihan</TextWrapedBorder>
          </motion.span>
          <motion.p
            className="text-muted-foreground text-balance text-sm lg:text-lg text-center md:w-3/4 w-full"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Temukan artikel menarik tentang teknologi, bisnis, dan perkembangan digital. Konten
            terbaru dan mendalam untuk membantu Anda memahami tren industri terkini.
          </motion.p>
        </motion.div>

        <ListCardPost
          thumbnail={{
            title: dummyPost[2].title,
            description: dummyPost[2].description,
            image: '/carousel-image/thumbnail-3.jpeg',
          }}
          dummyPost={dummyPost}
        />
      </div>
      <ToolbarFilter />
    </LayoutSection>
  );
};

export default Page;
