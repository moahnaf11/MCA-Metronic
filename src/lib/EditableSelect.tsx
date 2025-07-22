import { Fragment, useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function EditableSelect<TData>({ getValue }: CellContext<TData, string>) {
  const initialValue = getValue();
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleProceed = async () => {
    // try {
    //   // Example API call
    //   await fetch('/api/update', {
    //     method: 'POST',
    //     body: JSON.stringify({ value: pendingValue }),
    //   });
    //   // Close alert after API
    //   setShowAlert(false);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setOpen(false);
    console.log('clicked');
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <Fragment>
      <Select
        value={value}
        onValueChange={(value) => {
          if (initialValue !== value) {
            setOpen(true);
            setValue(value);
          } else {
            setValue(initialValue);
          }
        }}
      >
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to make changes to this cell?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed} variant="destructive">
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

export default EditableSelect;
