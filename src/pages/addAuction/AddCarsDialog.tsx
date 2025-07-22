import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDirection } from '@radix-ui/react-direction';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const AddCarsDialog = () => {
  const [open, setOpen] = useState(false);
  const direction = useDirection();
  const FormSchema = z.object({
    vin: z.string().length(17, 'VIN must be 17 characters in length'),
    year: z.string().length(4, 'Year must be 4 digits'),
    make: z.string().min(1, 'Please provide make'),
    model: z.string().min(1, 'Please provide model'),
    color: z.string().min(1, 'Please provide color'),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { vin: '' },
    mode: 'onChange',
  });
  function onSubmit() {
    toast.custom(
      (t) => (
        <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>Car Added to the auction successfully</AlertTitle>
        </Alert>
      ),
      { duration: 1000 },
    );
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          setOpen(false);
          form.reset();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Add Car</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" dir={direction}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add a Car</DialogTitle>
              <DialogDescription>
                Add a new car to this auction
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIN</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC12345MNBGJGB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input placeholder="Chevrolet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Escalade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="White" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarsDialog;
