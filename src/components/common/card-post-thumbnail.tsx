import { DotIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

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
  date?: string;
  category?: string;
  image?: string;
  isLast?: boolean;
}

const CardPostThumbnail = ({
  title,
  description,
  date = '11 November 2024',
  category = 'Article',
  isLast = false,
}: CardPostThumbnailProps) => {
  return (
    <div
      className={cn(
        'w-full py-8 md:py-14 hover:bg-background-new/50 transition-all duration-300 cursor-pointer group',
        isLast ? 'border-b-0' : 'border-b',
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-6 items-start">
        <div className="col-span-2">
          <p className="text-sm font-[400] text-muted-foreground leading-relaxed">{date}</p>
        </div>
        <div className="col-span-4 grid grid-cols-1 gap-4">
          <h1 className="text-[21px] font-[500] leading-tight text-black group-hover:text-black-shadow/80 transition-colors duration-300">
            {title}
          </h1>
          <span className="text-sm font-[400] text-muted-foreground ">{category}</span>
        </div>
        <div className="col-span-6">
          <p className="text-[15px] font-[400] text-black-shadow leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Mobile/Vertical Layout */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center justify-start gap-1">
          <p className="text-sm font-[400] text-muted-foreground">{date}</p>
          <DotIcon className="text-black-shadow" size={16} strokeWidth={1.5} />
          <span className="text-sm font-[400] text-muted-foreground">{category}</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg md:text-xl font-[500] leading-tight text-black group-hover:text-black-shadow/80 transition-colors duration-300">
            {title}
          </h1>
          <p className="text-sm font-[400] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPostThumbnail;
