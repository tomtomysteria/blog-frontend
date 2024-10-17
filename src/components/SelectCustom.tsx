import { Control, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type SelectCustomProps<T> = {
  name: string;
  control: Control<any>;
  context: string;
  items: T[];
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  className?: string;
};

const SelectCustom = <T,>({
  name,
  control,
  context,
  items,
  getItemValue,
  getItemLabel,
  className = 'w-1/2',
}: SelectCustomProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value) =>
            field.onChange(value === 'none' ? '' : value)
          }
          defaultValue={field.value}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={context} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{context}</SelectItem>
            {items.map((item) => (
              <SelectItem key={getItemValue(item)} value={getItemValue(item)}>
                {getItemLabel(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectCustom;
