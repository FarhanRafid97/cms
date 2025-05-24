import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { AlertCircle } from 'lucide-react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  info?: string;
  error?: string;
  isRequired?: boolean;
};

const CompleteInputAmount = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, info, type, isRequired, ...props }, ref) => {
    const currencyRef = React.useRef<HTMLButtonElement>(null);
    return (
      <div className="grid grid-cols-1 items-center gap-2 ">
        <Label className="inline gap-2 " isRequired={isRequired}>
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            type={type}
            {...props}
            className={cn(
              'col-span-3 pl-[65px]',
              error ? 'border-red-400  focus-visible:ring-red-200' : null,

              !!info && 'pr-4',
              className,
            )}
          />
          {!!info && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger
                  className="absolute  right-2 top-1/2 transform -translate-y-1/2"
                  type="button"
                >
                  <AlertCircle size={16} className="text-primary/60" />
                </TooltipTrigger>
                <TooltipContent
                  className={cn('bg-black text-white max-w-xl border-none', className)}
                >
                  <p className="inline-flex whitespace-normal">{info}</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <button
            ref={currencyRef}
            type="button"
            className="bg-secondary font-normal   rounded-md h-full flex items-center left-0 px-4 top-1/2 transform absolute -translate-y-1/2 text-xs"
          >
            IDR
          </button>
        </div>
        {error ? <Label className="text-red-400">{error}</Label> : null}
      </div>
    );
  },
);
CompleteInputAmount.displayName = 'CompleteInputAmount';

export { CompleteInputAmount };
