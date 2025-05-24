import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { FC } from 'react';
import { Badge } from './ui/badge';

interface BadgeWIthTooltipProps {
  color: string;
  text: string;
  maxLength?: number;
}

const BadgeWIthTooltip: FC<BadgeWIthTooltipProps> = ({ color, text, maxLength = 20 }) => {
  if (text.length <= maxLength) {
    return (
      <Badge variant="outline" className={cn(`h-fit w-fit text-white  `, color)}>
        <p className="font-medium">{text}</p>
      </Badge>
    );
  }
  const newText = text.slice(0, maxLength - 1) + '...';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="font-medium ">
          <Badge variant="outline" className={cn(`h-fit w-fit text-white  `, color)}>
            <p className="font-medium   whitespace-nowrap">{newText}</p>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className={cn('bg-black text-white  w-[200px]  border-none ')}>
          <p className="font-medium  text-[12px]  whitespace-normal ">{`${text}`}</p>

          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BadgeWIthTooltip;
