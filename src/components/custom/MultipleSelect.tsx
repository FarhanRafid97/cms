import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { PopoverClose } from '@radix-ui/react-popover';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export function MultipleSelectDropdown({
  isPending,

  selectedData,
  label,
  options,
  handleChange,
  error,
  isDisabled,
}: {
  label: string;
  options: DefaultOptionSelectDropDown[];
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
  isPending?: boolean;
  selectedData: string;
  error?: string;
  isDisabled?: boolean;
}) {
  const [valueSelected, setValueSelected] = useState<Map<string, string>>(() => {
    if (selectedData) {
      const substrings = selectedData.split(',');
      const tempMap = new Map(substrings?.map((item) => [`${item}`, `${item}`]));
      options.forEach((item) => {
        if (tempMap.has(item.value)) {
          tempMap.set(item.value, item.label);
        }
      });

      return tempMap;
    } else {
      return new Map();
    }
  });

  const handleSetState = () => {
    const multipleSelectData = Array.from(valueSelected.keys()).join(',');
    handleChange(multipleSelectData);
  };

  const handleChangeSelectCategories = ({ key, value }: { key: string; value: string }) => {
    const copyMap = new Map(valueSelected);
    const keystring = `${key}`;

    if (copyMap.has(keystring)) {
      copyMap.delete(keystring);
    } else {
      copyMap.set(keystring, value);
    }

    setValueSelected(copyMap);
    return copyMap;
  };

  if (isPending) {
    return <Skeleton className="w-[100px]" />;
  }

  return (
    <div className="grid grid-cols-1 items-center gap-2">
      <Label className={cn('inline gap-2 font-medium ')}>{label}:</Label>
      <Popover>
        <PopoverTrigger asChild disabled={isPending} className="col-span-4">
          <Button
            disabled={isDisabled}
            variant="ghost"
            size="sm"
            className="h-8 rounded-none border-l-0 border-t-0 border-r-0 border-b flex justify-between shadow-none px-1"
          >
            {valueSelected?.size > 0 ? (
              <div className="overflow-auto ">
                <div className="space-x-1 flex">
                  {valueSelected.size > 6 ? (
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 rounded-sm px-1 font-bold text-blue-700"
                    >
                      {valueSelected.size} selected
                    </Badge>
                  ) : (
                    Array.from(valueSelected).map((option) => (
                      <Badge
                        variant="secondary"
                        key={`${option[0]}`}
                        className="bg-blue-50 rounded-sm px-1 text-[10px] font-bold text-blue-700"
                      >
                        {option?.[1] || ''}{' '}
                        <X
                          size={14}
                          className="ml-1"
                          strokeWidth={3}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const selectedMap = handleChangeSelectCategories({
                              value: option?.[1] || '',
                              key: option?.[0] || '',
                            });
                            const multipleSelectData = Array.from(selectedMap.keys()).join(',');
                            handleChange(multipleSelectData);
                          }}
                        />
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <p>Pilih {label}...</p>
            )}
            <div>
              <ChevronDownIcon width={16} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-full "
          align="start"
          onCloseAutoFocus={() => {
            handleSetState();
          }}
        >
          {options?.length ? (
            <>
              <Command>
                <CommandInput placeholder={label} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandItem
                    onSelect={() => {
                      if (valueSelected.size) {
                        setValueSelected(new Map());
                      } else {
                        const newData = new Map(
                          options?.map((item) => [`${item.value}`, `${item.label}`]),
                        );
                        setValueSelected(newData);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        valueSelected.size
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
                    </div>
                    {valueSelected.size ? 'Unselect all' : 'Select All'}
                  </CommandItem>
                  <CommandSeparator className="my-1" />

                  {options?.map((option) => {
                    const isSelected = valueSelected.has(`${option.value}`);

                    return (
                      <CommandItem
                        key={`${option.value}-${option.label}`}
                        onSelect={() => {
                          handleChangeSelectCategories({
                            key: option.value,
                            value: option.label,
                          });
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <Check className={cn('h-4 w-4')} />
                        </div>

                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandList>
              </Command>
            </>
          ) : (
            <p className="text-xs p-4 text-center">No Data</p>
          )}
          <div className="px-2 py-1 space-y-1 ">
            <PopoverClose asChild={true} className="w-full">
              <Button
                onClick={() => {
                  handleSetState();
                }}
              >
                Select Filter{' '}
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
      {error ? <Label className="text-destructive ">{error}</Label> : null}
    </div>
  );
}
