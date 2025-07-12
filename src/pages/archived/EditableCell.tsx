import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Vehicle } from '@/lib/vehicles';
import { Input } from '@/components/ui/input';

const EditableCell = ({
  row,
  getValue,
  column,
}: CellContext<Vehicle, unknown>) => {
  const initialValue = getValue();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);

  return (
    <Input
      //   onBlur={() => {
      //      confirm('Warning! Do you want to make changes');
      //   }}
      className="w-min"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export default EditableCell;
