import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AspectRatio } from '../ui/aspect-ratio';

interface CardPostThumbnailProps {
  title: string;
  description: string;
  image: string;

  className?: string;
}

const CardBanner = ({
  title,
  description,
  image,

  className,
}: CardPostThumbnailProps) => {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 cursor-pointer md:flex hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:via-black/20 before:to-transparent before:z-10',
        className,
      )}
      tabIndex={0}
      role="button"
      aria-label={`Read more about ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      {/* Image Container */}
      <AspectRatio className="relative w-full overflow-hidden rounded-3xl" ratio={16 / 6}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </AspectRatio>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
        <div className="space-y-3">
          <h2 className="text-xl font-bold leading-tight tracking-tight transition-all duration-300 group-hover:text-blue-200 md:text-2xl">
            {title}
          </h2>

          <p className="text-sm leading-relaxed text-gray-200 opacity-90 transition-all duration-300 group-hover:opacity-100 md:text-base">
            {description}
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-4 transform transition-all duration-300 group-hover:translate-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-blue-300 hover:text-blue-100 hover:bg-transparent font-medium text-sm group/btn"
            aria-label={`Read more about ${title}`}
          >
            <span className="group-hover/btn:underline underline-offset-4 decoration-2">
              Read More
            </span>
            <ArrowUpRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
            />
          </Button>
        </div>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 z-30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-white/20 rounded-full blur-sm animate-pulse" />
        <div className="absolute top-4 right-4 h-2 w-2 bg-white/30 rounded-full blur-sm animate-pulse delay-75" />
      </div>
    </article>
  );
};

export default CardBanner;
