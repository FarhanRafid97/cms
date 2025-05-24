import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };
const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const CommandLabelWIthInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const refInput = React.useRef<HTMLLabelElement>(null);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <label ref={refInput} className="flex  w-full relative cursor-text">
            <input
              ref={ref}
              type={type}
              value={value}
              placeholder=" "
              autoComplete="off"
              className={cn(
                'input_search h-[50px] cursor-pointer  w-full px-4 text-sm  bg-white  border-2 rounded border-opacity-50 outline-none  placeholder-gray-300 placeholder-opacity-0 transition duration-200 border-black focus:border-blue-600',
                className,
              )}
              {...props}
            />
            <span
              className={`label_search text-black text-opacity-40
    ext-md   bg-white  absolute left-3 top-1/2 transform -translate-y-1/2 px-2 transition duration-200 input-text`}
            >
              {label || 'Label'}
            </span>
            <ChevronDown
              className={`absolute right-[9px] top-1/2 transform -translate-y-1/2  animate-all duration-200 ${
                !open ? 'rotate-0' : 'rotate-[180deg]'
              }`}
            />
          </label>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command style={{ width: `${(refInput.current?.offsetWidth || 0) - 10}px` }}>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
CommandLabelWIthInput.displayName = 'CommandLabelWIthInput';

export { CommandLabelWIthInput };
