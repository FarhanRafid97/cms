import { cn } from '@/lib/utils';
import { CircleDashed, Lightbulb, Rss } from 'lucide-react';
import Image from 'next/image';
import LayoutSection from './layout-section';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const BentoCard = ({
  children,
  wrapperClassName,
  innerClassName,
  link,
  labelLink,
}: {
  children: React.ReactNode;
  wrapperClassName?: string;
  innerClassName?: string;
  link: string;
  labelLink: string;
}) => {
  return (
    <Link href={link} className="block">
      <div
        className={cn(
          'group flex items-center justify-center rounded-[12px] bg-white p-3 sm:p-4 h-full transition-all duration-300 hover:bg-gray-50 active:bg-gray-100 relative overflow-hidden cursor-pointer touch-manipulation',
          wrapperClassName,
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-background/60 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-center absolute bottom-3 sm:-bottom-4 left-3 sm:left-4 transform translate-y-full  md:bottom-8 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300">
            <Button variant="ghost" className="text-sm sm:text-md">
              Baca {labelLink}
              <ArrowTopRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            'flex items-start justify-start rounded-[12px] bg-muted/50 p-3 sm:p-4 h-full relative overflow-hidden w-full transition-all duration-300 hover:bg-muted/70',
            innerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </Link>
  );
};

export default function BentoSection() {
  return (
    <LayoutSection>
      <div className="mx-auto w-full py-4 sm:py-8 px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 gap-3 sm:gap-4">
            <BentoCard
              link="/Blog?type=article"
              labelLink="Artikel"
              innerClassName="h-[250px] sm:h-[300px] md:h-full"
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 border bg-white/50 border-wite rounded-xl w-fit">
                    <Lightbulb className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Artikel</h1>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground w-full sm:w-6/12 leading-relaxed">
                  Nikmati artikel bermanfaat yang dapat diakses di mana saja dan kapan saja
                </span>
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:transform-none md:left-auto md:-bottom-24 md:-right-8 md:translate-x-0 opacity-80">
                <Image
                  src="/illustrator/smart-people.svg"
                  alt="bento-section-1"
                  width={300}
                  height={300}
                  className="w-[170px] h-[170px]  md:w-[300px] md:h-[300px]"
                />
              </div>
            </BentoCard>
            <BentoCard
              link="/Blog?type=news"
              labelLink="Berita"
              innerClassName="h-[250px] sm:h-[300px] md:h-full  "
            >
              <div className="flex justify-end flex-col gap-2 text-right items-end w-full">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Berita</h1>
                  <div className="p-1.5 sm:p-2 border bg-white/50 border-wite rounded-xl w-fit">
                    <Rss className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground w-full sm:w-2/4 text-right leading-relaxed">
                  Selalu update berita terbaru dari berbagai sumber dengan sangat mudah dan cepat
                </span>
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:transform md:-bottom-24 md:-left-8 md:translate-x-0 opacity-80">
                <Image
                  src="/illustrator/news.svg"
                  alt="bento-section-2"
                  width={300}
                  height={300}
                  className="w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px]"
                />
              </div>
            </BentoCard>
          </div>
          <div className="col-span-1 md:col-span-5">
            <BentoCard
              innerClassName="h-[250px] sm:h-[300px] md:h-[500px]"
              link="/Blog?type=story"
              labelLink="Cerita"
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 border bg-white/50 border-wite rounded-xl w-fit">
                    <CircleDashed className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Cerita</h1>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground w-full sm:w-3/4 leading-relaxed">
                  Nikmati kemudahan baca buku secara online dan dimana saja
                </span>
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:transform-none md:left-auto md:-bottom-20 md:-right-8 md:translate-x-0 opacity-80">
                <Image
                  src="/illustrator/get-inspired.svg"
                  alt="bento-section-3"
                  width={400}
                  height={300}
                  className="w-[170px] h-[170px] sm:w-[200px] sm:h-[150px] md:w-[300px] md:h-[300px]"
                />
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </LayoutSection>
  );
}
