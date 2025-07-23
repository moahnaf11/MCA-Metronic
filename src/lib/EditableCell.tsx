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
import { Input } from '@/components/ui/input';
import { cn } from './utils';

function EditableCell<TData>({
  cell,
  globalFilter,
}: CellContext<TData, string> & { globalFilter: string }) {
  const initialValue = cell.getValue();
  // const [showAlert, setShowAlert] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

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

  return (
    <Fragment>
      <Input
        onBlur={() => {
          if (initialValue !== value) {
            setOpen(true);
          } else {
            setValue(initialValue);
          }
        }}
        className={cn(
          'w-min',
          globalFilter &&
            value.toLowerCase().includes(globalFilter.toLowerCase())
            ? 'bg-yellow-100 border-yellow-500'
            : '',
        )}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

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

export default EditableCell;
