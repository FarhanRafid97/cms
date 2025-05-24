import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { FC, ReactNode, useRef, useState } from 'react';

const statusMapping = {
  PRODUCT_TYPE: {
    success: [100],
    process: [1, 2],
  },

  REPOT_MASS_CREDIT: { success: [100, 9], process: [3, 4, 5, 6, 7, 8, 2, 21] },
  BRINETS: { success: [9], process: [1, 2, 6, 5] },
  REPOT_MASS_GL: { success: [100], process: [2, 4, 5, 6, 7, 8, 9, 3] },
  REPOT_MASS_GL_DETAIL: {},
  REPOT_MASS_DEBET: { success: [9, 100], process: [3, 4, 5, 6, 7, 8, 2, 21] },
  REPOT_MASS_DEBET_BPUM: {
    success: [11],
    process: [2, 4, 5, 6, 7, 8, 9, 3, 31, 32],
  },
  VALIDAS_FILE: {
    success: [2],
    process: [1],
  },
  PRE_BATCH: {
    success: [100],
    process: [2, 3],
  },
  AFTER_BTACH: {
    success: [2, 100],
    process: [3],
  },
};

type StatusMapping = typeof statusMapping;

type TypeVariant = keyof StatusMapping;

interface BadgeStatusProps {
  rowId: string;
  children: ReactNode;
  status: number;
  className?: string;
  textClassName?: string;
  statusbrinet?: string;
  isTruncateText?: boolean;
  type: TypeVariant;
}
const variant = {
  green: 'bg-emerald-50 text-emerald-900  ring-emerald-600/30',
  gray: 'bg-muted text-gray-600 ring-1  ring-gray-500/20',
  red: 'bg-rose-50 text-rose-900 ring-1  ring-rose-600/20',
  blue: 'bg-sky-50 text-sky-900 ring-1  ring-sky-600/20',
};

export const getVariant = (type: TypeVariant, status: number, statusbrinet?: string) => {
  if (type === 'REPOT_MASS_GL_DETAIL') {
    if (statusbrinet == '000' || statusbrinet == '00') {
      return variant.green;
    }
    return variant.red;
  }
  const { success, process } = statusMapping[type];
  if (status < 0) return variant.red;
  if (success.includes(status)) return variant.green;
  if (process.includes(status)) return variant.blue;
  return variant.gray;
};

const BadgeStatus: FC<BadgeStatusProps> = ({
  rowId,
  children,
  status,
  type,
  className,
  textClassName,
  statusbrinet,
  isTruncateText = true,
}) => {
  const color = getVariant(type, status, statusbrinet);
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
          'inline-flex items-center gap-x-1 whitespace-nowrap rounded-md px-2 py-1 text-xs ring-1 ring-inset   max-w-fit',
          color,
          className,
        )}
        style={{ width: `calc(var(--header-${rowId}-size) * 1px)` }}
      >
        {isTruncateText && isTruncated ? (
          <Tooltip>
            <TooltipTrigger
              className={cn(
                'h-fit overflow-hidden rounded-md max-w-fit text-[12px] cursor-text  truncate font-semibold',
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
              'h-fit overflow-hidden rounded-md max-w-fit text-[12px]  truncate font-semibold',
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

export default BadgeStatus;
