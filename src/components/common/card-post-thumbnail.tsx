import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
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
}

const CardPostThumbnail = ({ title, description, image, variant }: CardPostThumbnailProps) => {
  return (
    <div className=" border bg-[#fff] p-5 rounded-2xl transition-all duration-300  flex flex-col gap-3 cursor-pointer ease-in-out shadow-lg h-full">
      <div className="flex justify-start gap-2 h-fit">
        <Badge
          variant="default"
          className="gap-1 h-8 rounded-lg bg-emerald-50 text-emerald-800 shadow-none border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-900"
        >
          Budaya
        </Badge>
        <Badge
          variant="default"
          className="gap-1 h-8 rounded-lg bg-sky-50 text-sky-800 shadow-none border border-sky-200 hover:bg-sky-100 hover:text-sky-900"
        >
          Kota
        </Badge>

        <Badge
          variant="default"
          className="gap-1 h-8 rounded-lg bg-purple-50 text-purple-800 shadow-none border border-purple-200 hover:bg-purple-100 hover:text-purple-900"
        >
          Terbaru
        </Badge>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            cardPostThumbnailVariants({ variant }),
            'w-full rounded-xl overflow-hidden shadow relative col-span-1 h-[250px]',
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-2">
            <h1 className="text-md font-bold">{title}</h1>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-black-shadow flex items-center gap-1">
                <User size={14} className="text-sky-400" /> Yusrizal KW
              </p>
              <p className="text-xs text-black-shadow flex items-center gap-1">
                <Calendar size={14} className="text-orange-400" /> 17 November 2024
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="mt-auto">
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
    </div>
  );
};

export default CardPostThumbnail;
