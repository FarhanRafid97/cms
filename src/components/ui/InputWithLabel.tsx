import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex relative cursor-text">
          <input
            type={type}
            ref={ref}
            placeholder=" "
            autoComplete="off"
            className={cn(
              'input h-[50px]  w-full px-4 text-sm  bg-white  border rounded border-opacity-50 outline-none  placeholder-gray-300 placeholder-opacity-0 transition duration-200 border-black focus:border-blue-600',
              className,
            )}
            {...props}
          />
          <span
            className={`label text-black text-opacity-40
    ext-md   bg-white  absolute left-3 top-1/2 transform -translate-y-1/2 px-2 transition duration-200 input-text`}
          >
            {label || 'Label'}
          </span>
        </label>
      </div>
    );
  },
);
InputWithLabel.displayName = 'InputWithLabel';

export { InputWithLabel };
