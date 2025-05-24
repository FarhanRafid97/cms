import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';
import { Info } from 'lucide-react';

export const TableCellCostume = ({
  children,
  className: c,
  id,
}: {
  children: ReactNode;
  id: string;
  className?: string;
}) => {
  return (
    <div
      style={{ width: `calc(var(--header-${id}-size) * 1px )` }}
      className={cn(' truncate overflow-hidden  text-[13px] px-1 ', c)}
    >
      {children || '-'}
    </div>
  );
};

export const CellWithErrorMessage = ({ message }: { message: string; isOpen?: boolean }) => {
  if (message.startsWith(',')) {
    message = message.slice(1);
  }

  const listError = message.split('.').filter((d) => d.length > 1);
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Info className="text-my-red " strokeWidth={2} size={14} />
        </TooltipTrigger>
        <TooltipContent className="bottom-8">
          <ul className="list-disc ml-3 space-y-2">
            {listError.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
