import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Vehicle } from '@/lib/vehicles';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const EditableSelect = ({ getValue }: CellContext<Vehicle, unknown>) => {
  const initialValue = getValue();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);
  return (
    <Select disabled value={value} onValueChange={setValue}>
      <SelectTrigger className="min-w-min">
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="red"> Red</SelectItem>
        <SelectItem value="green">Green</SelectItem>
        <SelectItem value="blue"> Blue</SelectItem>
        <SelectItem value="black"> Black</SelectItem>
        <SelectItem value="white"> White</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default EditableSelect;
