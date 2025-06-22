import Image from 'next/image';
import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Search, Send } from 'lucide-react';

const cardPostThumbnailVariants = cva('', {
  variants: {
    variant: {
      xs: ' h-[100px]',
      sm: 'h-[200px]',
      md: 'h-[285px]',
      lg: 'md:h-[400px] h-[285px]',
      xl: 'md:h-[500px] h-[285px]',
    },
  },
  defaultVariants: {
    variant: 'md',
  },
});

interface CardPostThumbnailProps extends VariantProps<typeof cardPostThumbnailVariants> {
  title: string;
  description: string;
  image: string;
  aspectRatio?: {
    width: number;
    height: number;
  };
}

const CardPostThumbnail = ({
  title,
  description,
  image,
  variant,
  aspectRatio = {
    width: 7,
    height: 9,
  },
}: CardPostThumbnailProps) => {
  return (
    <div className=" bg-white p-2.5 rounded-3xl w-full shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 gap-4">
      <div
        className={cn(
          cardPostThumbnailVariants({ variant }),
          'w-full bg-background-new rounded-2xl overflow-hidden',
        )}
      >
        <AspectRatio ratio={aspectRatio?.width / aspectRatio?.height} className="">
          <Image
            src={image}
            alt={title}
            fill
            className="object-fill rounded-xl"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 40vw, 33vw"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-2 p-2 pb-4 ">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex gap-2 justify-between">
        <Button
          variant="outline"
          className="rounded-3xl w-full flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Share
        </Button>
        <Button
          variant="default"
          className="rounded-3xl w-full flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Detail
        </Button>
      </div>
    </div>
  );
};

export default CardPostThumbnail;
