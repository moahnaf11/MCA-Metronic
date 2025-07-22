import { Fragment, useEffect, useState } from 'react';
import { RiAlertFill } from '@remixicon/react';
import { CellContext } from '@tanstack/react-table';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import DialogContent, {
  Dialog,
  DialogBody,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    // setShowAlert(false);
    setOpen(false);
    console.log('clicked');
  };

  return (
    <Fragment>
      <Input
        onBlur={() => {
          if (initialValue !== value) {
            // setShowAlert(true);
            setOpen(true);
          } else {
            setValue(initialValue);
          }
        }}
        className="w-min"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent close={false} className="max-h-[90%] p-0">
          <ScrollArea className="overflow-y-auto">
            <DialogBody className="">
              <Alert
                className=" rounded-lg shadow-lg"
                variant="destructive"
                appearance="light"
                close={false}
              >
                <AlertIcon>
                  <RiAlertFill />
                </AlertIcon>
                <AlertContent className="flex-1">
                  <AlertTitle>Warning! Changes will be made</AlertTitle>
                  <AlertDescription>
                    <p>
                      Are you sure you want to change the value of this cell?
                    </p>
                    <div className="space-x-3.5 flex justify-end mt-4">
                      <Button
                        onClick={handleProceed}
                        variant="destructive"
                        size="md"
                      >
                        Proceed
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="secondary"
                        size="md"
                      >
                        Cancel
                      </Button>
                    </div>
                  </AlertDescription>
                </AlertContent>
              </Alert>
            </DialogBody>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default EditableCell;
