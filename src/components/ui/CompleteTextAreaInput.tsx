import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from './textarea';

export type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  isRequired?: boolean;
};

const CompleteTextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, error, type, isRequired, ...props }, ref) => {
    return (
      <div className="grid grid-cols-1 items-center gap-2">
        <Label isRequired={isRequired}>{label}</Label>
        <Textarea
          ref={ref}
          type={type}
          {...props}
          className={cn(
            'col-span-3',
            error ? 'border-red-400  focus-visible:ring-red-200' : null,
            className,
          )}
        />

        {error ? <Label className="text-red-400">{error}</Label> : null}
      </div>
    );
  },
);
CompleteTextArea.displayName = 'CompleteTextArea';

export { CompleteTextArea };
