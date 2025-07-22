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

function EditableCell<TData>({ cell }: CellContext<TData, string>) {
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
        className="w-min"
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
