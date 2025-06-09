import { Command, CommandEmpty, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { PopoverClose } from '@radix-ui/react-popover';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

interface SelectDropdownProps {
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (value: DefaultOptionSelectDropDown) => void;
  isEnabled?: boolean;
  selectedVal?: string;
  option?: DefaultOptionSelectDropDown[];
  disabled?: boolean;
  error?: string;
  label: string;
  isPending?: boolean;
}

const defaultValue: DefaultOptionSelectDropDown = {
  label: '',
  value: '',
};

const SelectDropdown: FC<SelectDropdownProps> = ({
  handleOnChange,
  error,

  label,
  option,
  selectedVal,
  disabled,
  isPending,
}) => {
  const [valueState, setValueState] = useState<DefaultOptionSelectDropDown>(() => defaultValue);

  const SelectedData = useMemo(() => {
    return (
      option?.find((transaction) => `${transaction.value}` === `${selectedVal}`) || defaultValue
    );
  }, [option, selectedVal]);

  if (isPending) {
    return <div className="w-full h-10 rounded animate-pulse bg-gray-300" />;
  }
  return (
    <div className="grid grid-cols-1 items-center gap-2">
      <Label className={cn('inline gap-2 font-medium ')}>{label}:</Label>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <div className="relative">
              <Input
                disabled={disabled}
                value={SelectedData.label || `Pilih ${label}...`}
                role="combobox"
                data-test="transaction-type"
                className={cn('cursor-pointer focus-visible:ring-0 bg-background')}
                readOnly
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              />
              <ChevronsUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className=" p-0 z-[99999999999] ">
          <Command>
            <CommandInput placeholder={`Cari ${label}...`} className="h-9" />

            <CommandEmpty>{label}Tidak Ditemukan.</CommandEmpty>

            {option?.map((opt) => (
              <CommandItem
                className="p-0"
                key={opt.value}
                value={opt.label}
                onSelect={(currentValue) => {
                  if (currentValue.toLowerCase() === valueState.label.toLowerCase()) {
                    setValueState(defaultValue);
                    handleOnChange(defaultValue);
                  } else {
                    setValueState(opt);
                    handleOnChange(opt);
                  }
                }}
              >
                <PopoverClose className="flex items-center  w-full h-full p-2">
                  <CheckIcon
                    color="blue"
                    className={cn(
                      'mr-1 h-4 w-4 ',
                      SelectedData.value === opt.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {opt.label}
                </PopoverClose>
              </CommandItem>
            ))}
          </Command>
        </PopoverContent>
      </Popover>
      {error ? <Label className="text-destructive ">{error}</Label> : null}
    </div>
  );
};

export default SelectDropdown;
