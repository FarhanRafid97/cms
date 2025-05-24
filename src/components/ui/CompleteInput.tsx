import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { TooltipArrow } from '@radix-ui/react-tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  info?: string;
  error?: string;
  isRequired?: boolean;
};

const CompleteInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, info, type, isRequired, ...props }, ref) => {
    return (
      <div className="grid grid-cols-1 items-center gap-2">
        <Label className="inline gap-2 " isRequired={isRequired}>
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            type={type}
            {...props}
            className={cn(
              'col-span-3',
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
                <TooltipContent className={cn('bg-black text-white border-none', className)}>
                  <p className="inline-flex whitespace-normal">{info}</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {error ? <Label className="text-red-400">{error}</Label> : null}
      </div>
    );
  },
);
CompleteInput.displayName = 'CompleteInput';

export { CompleteInput };
