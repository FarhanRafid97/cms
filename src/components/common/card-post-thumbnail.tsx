import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { Button } from '../ui/button';

const cardPostThumbnailVariants = cva('', {
  variants: {
    variant: {
      xs: ' h-[100px]',
      sm: 'h-[200px]',
      md: 'h-[245px]',
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
    <div className="wrapper-card-with-inner border bg-[#fff] p-3 rounded-[32px]  transition-all duration-300 grid grid-cols-1 gap-4 cursor-pointer ease-in-out shadow-lg h-full">
      <div
        className={cn(
          cardPostThumbnailVariants({ variant }),
          'w-full bg-muted-foreground rounded-[20px] overflow-hidden shadow',
        )}
      >
        <AspectRatio ratio={aspectRatio?.width / aspectRatio?.height} className="">
          <Image
            src={image}
            alt={title}
            fill
            className="object-fill rounded-xl"
            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 40vw, 33vw "
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col gap-2 p-2 pb-4">
        <h1 className="text-lg font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="px-2 mb-4">
        <Button
          variant="ghost"
          className="h-auto p-0 text-blue-600 hover:text-blue-700 hover:bg-transparent font-medium text-sm group/btn"
        >
          <span className="group-hover/btn:underline underline-offset-4">Selengkapnya</span>
          <ArrowUpRight
            size={16}
            className="ml-1 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
        </Button>
      </div>
    </div>
  );
};

export default CardPostThumbnail;
