import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { TooltipArrow } from '@radix-ui/react-tooltip';
import React, { FC } from 'react';

interface TextOrTooltipProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const TextOrTooltip: FC<TextOrTooltipProps> = ({ className, text, maxLength = 20 }) => {
  if (text.length <= maxLength) {
    return <p className="font-medium whitespace-nowrap">{text}</p>;
  }
  const newText = text.slice(0, maxLength - 1) + '...';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="font-medium  whitespace-nowrap hover:z-[999999] cursor-text">
          {newText}
        </TooltipTrigger>
        <TooltipContent className={cn('bg-black text-white border-none max-w-[250px]', className)}>
          <p className="w-3/4 inline-flex whitespace-normal">{text}</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextOrTooltip;
