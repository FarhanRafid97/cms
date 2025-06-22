import CardPostThumbnail from '@/components/common/card-post-thumbnail';
import ToolbarFilter from '@/components/common/toolbar-filter';
import TextWrapedBorder from '@/components/common/text-wrapped';
import LayoutSection from '@/components/modules/home-page/layout-section';
import { motion } from 'motion/react';
import React from 'react';
import { dummyPost } from '@/lib/options-default';

const Page = () => {
  return (
    <LayoutSection>
      <div className="container mx-auto min-h-screen flex flex-col gap-6">
        <motion.div
          className="flex flex-col gap-2 items-center justify-center md:mb-8 mb-4"
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
            Temukan berbagai artikel menarik dan bermanfaat yang dapat membantu Anda dalam
            mengembangkan kemampuan dan meningkatkan pemahaman Anda tentang teknologi, bisnis, dan
            perkembangan dunia digital. Kami menyediakan konten yang terbaru, mendalam, dan relevan
            untuk membantu Anda tetap terhubung dengan tren terbaru dalam industri teknologi dan
            inovasi digital yang sedang berkembang pesat di era modern ini.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <CardPostThumbnail
            title={dummyPost[2].title}
            variant="lg"
            aspectRatio={{
              width: 12,
              height: 9,
            }}
            description={dummyPost[2].description}
            image={dummyPost[2].image}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyPost.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                bounce: 0.1,
                duration: 0.6,
                delay: 0.2 + index * 0.1,
              }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <CardPostThumbnail
                title={item.title}
                description={item.description}
                image={item.image}
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
