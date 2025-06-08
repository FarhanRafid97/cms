import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { AlertCircle } from 'lucide-react';

export type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  isRequired?: boolean;
};

const CompleteTextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="grid grid-cols-1 items-center gap-2">
        <Label>{label}:</Label>
        <Textarea
          {...props}
          ref={ref}
          type={type}
          className={cn(
            'col-span-3 bg-background',

            error ? 'border-red-400  focus-visible:ring-red-200' : null,
            className,
          )}
        />

        {error ? (
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-red-400" />
            <Label className="text-red-400">{error}</Label>
          </div>
        ) : null}
      </div>
    );
  },
);
CompleteTextArea.displayName = 'CompleteTextArea';

export { CompleteTextArea };
