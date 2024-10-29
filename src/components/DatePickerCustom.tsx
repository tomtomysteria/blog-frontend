import { Control, Controller } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons';
import { PopoverClose } from '@radix-ui/react-popover';
import { Calendar } from './ui/calendar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatDateString, formatDisplayDate } from '@/utils/dateUtils';

type DatePickerCustomProps = {
  name: string;
  control: Control<any>;
};

const DatePickerCustom = ({ name, control }: DatePickerCustomProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <div>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-1/4 pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {selectedDate ? (
                    formatDisplayDate(selectedDate) // Display in "dd/mm/yyyy"
                  ) : (
                    <span>Choisissez une date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex m-1">
                  <div className="flex-1"></div>
                  <PopoverClose>
                    <Cross1Icon className="text-primary/60 hover:text-destructive" />
                  </PopoverClose>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(date ? formatDateString(date) : null);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
};

export default DatePickerCustom;
