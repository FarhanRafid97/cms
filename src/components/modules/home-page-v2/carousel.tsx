'use client';

import { Carousel, useCarousel } from '@/components/custom/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { pictCarousel } from '@/lib/options-default';
import { cn } from '@/lib/utils';
import { Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
// Jump to index component
const JumpToIndex = ({ items }: { items: (typeof pictCarousel)[0][] }) => {
  const { api, selectedIndex } = useCarousel();

  const jumpToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedIndex < items.length - 1) {
        api?.scrollTo(selectedIndex + 1);
      } else {
        api?.scrollTo(0);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [api, selectedIndex, items]);
  return (
    <div className=" flex-col gap-1 h-full  items-center justify-center md:flex hidden">
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() => jumpToSlide(index)}
          className={cn(
            'group relative bg-white/95 backdrop-blur-md shadow-sm border w-full  p-1 border-border-clean',
            'grid grid-cols-[190px_1fr] gap-4 rounded-xl cursor-pointer ',
            'transition-all duration-300 ease-out hover:shadow-lg ',
            'hover:bg-white hover:border-gray-300/60',
            selectedIndex === index && 'bg-blue-50/80',
            selectedIndex === index && 'hover:bg-blue-50/90',
            'shadow-box-shadow-clean border-[0.5px] border-border-clean',
          )}
          role="button"
          tabIndex={0}
          aria-label={`Jump to slide ${index + 1}: ${item.label}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              jumpToSlide(index);
            }
          }}
        >
          {/* Image Container */}
          <AspectRatio
            ratio={16 / 11}
            className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden bg-red-500  shadow-sm"
          >
            <Image
              src={item.imagePath}
              alt={item.label}
              objectFit="cover"
              fill
              className="w-full h-full top-0 left-0 object-contain rounded-lg border-[0.5px] border-border-clean shadow"
            />
          </AspectRatio>

          {/* Content Container */}
          <div className="flex flex-col justify-center gap-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
              {item.label}
            </h3>

            <div className="flex flex-col gap-1 text-xs text-gray-500">
              <p className="font-medium text-gray-600 truncate">{item.author}</p>
              <p className="truncate">{item.publish_date}</p>
            </div>

            {/* Progress indicator for selected item */}
          </div>

          {/* Subtle chevron indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CarouselMd = () => {
  return (
    <Carousel.Root className="    gap-1 h-full flex w-full  ">
      <div className="md:w-3/4 w-full min-h-[50vh] relative md:min-h-[65vh]    rounded-xl  border-border-clean">
        <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
          <ChevronLeft className="size-5" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
          <ChevronRight className="size-5" />
        </Carousel.NextTrigger>

        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-xl ">
          <Carousel.IndicatorGroup className="rounded-xl">
            <Carousel.Indicator index={0} className="rounded-xl" />
          </Carousel.IndicatorGroup>
        </div>

        <Carousel.Content className="gap-2 h-full   ">
          {pictCarousel.map((pict) => (
            <Carousel.Item key={pict.id} className=" w-full h-full   relative rounded-xl  ">
              <Card className="h-full overflow-hidden">
                <CardContent className=" h-full overflow-hidden">
                  <Image
                    src={pict.imagePath}
                    alt={pict.label}
                    objectFit="cover"
                    fill
                    className="w-full h-full top-0 left-0 object-cover relative   rounded-xl overflow-hidden"
                  />
                </CardContent>
              </Card>
              {/* CONTENT */}{' '}
              <div className="absolute bottom-0 left-0 z-10 w-full md:px-12 px-5">
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-none rounded-b-xl" />
                {/* News Header */}
                <div className="relative mb-4 md:mb-6 z-10">
                  {/* Main Headline */}
                  <div className="grid grid-cols-12 space-x-4">
                    <div className="col-span-11 pr-2">
                      {' '}
                      <Link href={`/article/${pict.id}`}>
                        <h1 className="text-xl sm:text-2x md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-lg">
                          {pict.label}
                        </h1>{' '}
                      </Link>
                      <p className="text-sm text-gray-200 leading-relaxed mb-4 md:mb-6 drop-shadow">
                        {pict.label_description}
                      </p>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                          <span className="font-medium text-xs md:text-sm drop-shadow">
                            {pict.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm drop-shadow">
                            {pict.publish_date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end"></div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </div>
      <div className="w-[420px] h-full  md:flex hidden">
        <JumpToIndex items={pictCarousel} />
      </div>
    </Carousel.Root>
  );
};
