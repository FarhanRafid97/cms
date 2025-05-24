import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from './ui/input';

interface DatePickerProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  handlerSelectDate: (e: Date | undefined) => void;
}
export function DatePicker({ date, handlerSelectDate }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="relative ">
          <Input
            value={date ? format(date, 'PPP p') : 'Pick a date'}
            readOnly
            className="pl-7 cursor-pointer"
          />

          <CalendarIcon className="absolute -translate-y-1/2 mr-2 h-4 w-4 top-1/2 left-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent isContentWidthAuto={false} className=" p-0 w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            handlerSelectDate(e);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
