import CardPostThumbnail from '@/components/common/card-post-thumbnail';
import ToolbarFilter from '@/components/common/toolbar-filter';
import TextWrapedBorder from '@/components/common/text-wrapped';
import LayoutSection from '@/components/modules/home-page/layout-section';
import { motion } from 'motion/react';
import React from 'react';

const ceritaData = [
  {
    title: 'Perjalanan Menjadi Developer di Usia 30',
    description:
      'Kisah inspiratif seorang karyawan yang memutuskan untuk beralih karir menjadi developer di usia yang tidak muda lagi.',
    image: '/thumbnail/example-thumbnail.webp',
  },
  {
    title: 'Membangun Startup dari Nol di Tengah Pandemi',
    description:
      'Pengalaman seru membangun platform edukasi online yang berhasil membantu ribuan siswa belajar dari rumah.',
    image: '/thumbnail/example-thumbnail-2.webp',
  },
  {
    title: 'Kolaborasi Tim Remote yang Sukses',
    description:
      'Tips dan trik mengelola tim developer yang tersebar di berbagai kota dan negara untuk project besar.',
    image: '/thumbnail/example-thumbnail-3.webp',
  },
  {
    title: 'Belajar AI/ML Tanpa Background Matematika',
    description:
      'Perjalanan seorang designer yang berhasil menguasai machine learning dan membuat aplikasi AI pertama.',
    image: '/thumbnail/example-thumbnail-4.webp',
  },
  {
    title: 'Mengoptimalkan Performa Website dari 3s ke 0.5s',
    description:
      'Case study lengkap tentang bagaimana tim kami berhasil meningkatkan kecepatan loading website secara drastis.',
    image: '/thumbnail/example-thumbnail-5.webp',
  },
  {
    title: 'Membangun Komunitas Tech yang Inklusif',
    description:
      'Cerita tentang bagaimana kami menciptakan ruang aman untuk developer perempuan dan minoritas di dunia tech.',
    image: '/thumbnail/example-thumbnail-6.webp',
  },
];

const Page = () => {
  return (
    <LayoutSection>
      <div className="container mx-auto min-h-screen flex flex-col gap-8">
        <motion.div
          className="flex flex-col gap-2 items-center justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="md:text-6xl text-2xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            List cerita
            <TextWrapedBorder className="w-fit">Pilihan</TextWrapedBorder>
          </motion.span>
          <motion.p
            className="text-muted-foreground text-balance lg:text-lg text-center w-3/4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tempat berkumpulnya para penggemar buku untuk berbagi pengetahuan, pengalaman, dan
            membangun masa depan literasi yang lebih baik
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <CardPostThumbnail
            title={ceritaData[0].title}
            variant="lg"
            aspectRatio={{
              width: 9,
              height: 9,
            }}
            description={ceritaData[0].description}
            image={ceritaData[0].image}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ceritaData.map((item, index) => (
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
