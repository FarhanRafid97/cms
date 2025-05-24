import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { FC, ReactNode, useRef, useState } from 'react';

interface TextOverflowTooltipProps {
  children: ReactNode;

  className?: string;
  textClassName?: string;
}

const TextOverflowTooltip: FC<TextOverflowTooltipProps> = ({
  children,

  className,
  textClassName,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = () => {
    const element = textRef.current;
    if (element) {
      const isOverflowing = element.scrollWidth > element.clientWidth;
      setIsTruncated(isOverflowing);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <span
        onMouseEnter={() => {
          checkTruncation();
        }}
        onMouseLeave={() => {
          setIsTruncated(false);
        }}
        className={cn(
          'inline-flex items-center gap-x-1 justify-center rounded-md px-2 py-1 text-xs    w-[250px]',

          className,
        )}
      >
        {isTruncated ? (
          <Tooltip>
            <TooltipTrigger
              type="button"
              className={cn(
                'h-fit overflow-hidden rounded-md  text-[12px] cursor-text  truncate font-semibold',
                textClassName,
              )}
            >
              {children}
            </TooltipTrigger>
            <TooltipContent align="start" side="top" className={cn('max-w-[300px]')}>
              {children}
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        ) : (
          <p
            ref={textRef}
            className={cn(
              'h-fit overflow-hidden   rounded-md max-w-fit text-[12px]  truncate font-semibold',
              textClassName,
            )}
          >
            {children || '-'}
          </p>
        )}
      </span>
    </TooltipProvider>
  );
};

export default TextOverflowTooltip;
