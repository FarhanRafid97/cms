import { motion } from 'motion/react';
import { BookOpen, MessageCircle, Send, Star, Users } from 'lucide-react';

import { ButtonMovingBorder } from '@/components/common/moving-border';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { match } from 'ts-pattern';
import LayoutSection from './layout-section';
import TextWrapedBorder from './text-wrapped';
import { FlipWords } from '@/components/common/flip-word';

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const stats = [
  {
    icon: Users,
    label: 'Anggota Aktif',
    value: '2,500+',
    borderLarge: 'border-custome-right',
    borderMedium: 'border-custome-bottom',
    borderSmall: 'border-custome-bottom',
  },
  {
    icon: BookOpen,
    label: 'Buku Dibaca',
    value: '15,000+',
    borderLarge: 'border-custome-right',
    borderMedium: 'border-custome-left',
    borderSmall: 'border-custome-bottom',
  },
  {
    icon: MessageCircle,
    label: 'Diskusi',
    value: '500+',
    borderLarge: 'border-custome-right',
    borderMedium: 'border-custome-right',
    borderSmall: 'border-custome-bottom',
  },
  {
    icon: Star,
    label: 'Rating Rata-rata',
    value: '4.8/5',
    borderLarge: '',
    borderMedium: 'border-custome-top',
    borderSmall: '',
  },
];

const Hero7 = ({
  heading = 'Komunitas Buku ',
  description = 'Bergabunglah dengan ribuan pembaca Indonesia untuk berbagi rekomendasi, diskusi mendalam, dan menemukan buku-buku terbaik yang akan mengubah cara pandang Anda.',
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
        alt: 'Avatar 1',
      },
      {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
        alt: 'Avatar 2',
      },
      {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
        alt: 'Avatar 3',
      },
      {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp',
        alt: 'Avatar 4',
      },
      {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp',
        alt: 'Avatar 5',
      },
    ],
  },
}: Hero7Props) => {
  const isLarge = useMediaQuery('(min-width: 1024px)');
  console.log('isLarge', isLarge);
  const isMedium = useMediaQuery('(min-width: 768px)');
  console.log('isMedium', isMedium);

  return (
    <LayoutSection
      className="relative flex h-full w-full items-center justify-center  dark:bg-black "
      containerClassName="lg:px-0 md:px-0 pb-0"
    >
      {' '}
      <div className="wrapper-hero-image ">
        <div className="hero-image"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative l"
      >
        <section className="py-14 md:py-32">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto flex max-w-5xl flex-col gap-6"
            >
              <h1 className="text-3xl font-extrabold lg:text-6xl">
                {heading}{' '}
                <TextWrapedBorder>
                  <FlipWords words={['Indonesia', 'kreatif', 'literasi']} duration={2000} />
                </TextWrapedBorder>
              </h1>
              <p className="text-muted-foreground text-balance lg:text-lg">{description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-2 justify-center mt-8 md:flex-row flex-col"
            >
              <div className="flex items-center gap-2 relative ">
                <Input placeholder="Berlangganan Berita" className="p-2 bg-white w-[300px] h-12" />
              </div>
              <div className=" right-4">
                <ButtonMovingBorder className="h-12">
                  <span className="flex items-center gap-2">
                    Berlangganan <Send size={14} />
                  </span>
                </ButtonMovingBorder>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row"
            >
              <span className="mx-4 inline-flex items-center -space-x-4">
                {reviews.avatars.map((avatar, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Avatar className="size-14 border">
                      <AvatarImage src={avatar.src} alt={avatar.alt} />
                    </Avatar>
                  </motion.div>
                ))}
              </span>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.3,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="mr-1 font-semibold">{reviews.rating?.toFixed(1)}</span>
                </div>
                <p className="text-muted-foreground text-left font-medium">
                  from {reviews.count}+ reviews
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-custome-top ">
        {stats.map((stat) => {
          const mappingBorder = match(isLarge)
            .with(true, () => stat.borderLarge)
            .otherwise(() =>
              match(isMedium)
                .with(true, () => stat.borderMedium)
                .otherwise(() => stat.borderSmall),
            );
          console.log('mappingBorder', stat.label, mappingBorder);
          return (
            <div
              key={stat.label}
              className={` p-4 py-6 flex justify-center gap-2 items-center ${mappingBorder}`}
            >
              <div className="flex items-center justify-center p-2 rounded bg-gray-200/80">
                <stat.icon size={22} className="text-sky-500" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-sm font-bold text-foreground ">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </LayoutSection>
  );
};

export { Hero7 };
