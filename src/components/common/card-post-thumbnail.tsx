import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';

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
    <div className="wrapper-card-with-inner bg-[#fff] p-1.5 rounded-[28px]  transition-all duration-300 grid grid-cols-1 gap-4 hover:translate-y-[-10px] cursor-pointer ease-in-out">
      <div
        className={cn(
          cardPostThumbnailVariants({ variant }),
          'w-full bg-background-new rounded-[22px] overflow-hidden',
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
      <div className="flex flex-col gap-2 p-2 pb-4">
        <h1 className="text-lg font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default CardPostThumbnail;
