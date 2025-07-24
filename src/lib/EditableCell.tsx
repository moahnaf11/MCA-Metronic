import { Fragment, useEffect, useState } from 'react';
import { CellContext, Row } from '@tanstack/react-table';
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
  type = 'text',
  globalFilter,
  updateRow,
}: CellContext<TData, string> & { type?: string } & {
  globalFilter?: string;
} & { updateRow?: (newValue: string, row: Row<TData>) => void }) {
  const initialValue = cell.getValue();
  // const [showAlert, setShowAlert] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleProceed = async () => {
    if (type === 'number') {
      updateRow?.(value, cell.row);
    }

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
        type={type}
        onBlur={() => {
          if (initialValue !== value) {
            setOpen(true);
          } else {
            setValue(initialValue);
          }
        }}
        className={cn(
          'max-w-max',
          globalFilter && value.toLowerCase().includes(globalFilter.toLowerCase())
            ? 'border-yellow-500 bg-yellow-100'
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
            <AlertDialogCancel onClick={handleCancel}>Go Back</AlertDialogCancel>
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
