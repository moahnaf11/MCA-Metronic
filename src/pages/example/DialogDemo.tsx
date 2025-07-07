import { zodResolver } from '@hookform/resolvers/zod';
import { useDirection } from '@radix-ui/react-direction';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { User } from 'lucide-react';
import { Input } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';
import { customerOptions } from '@/lib/vehicles';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

export default function DialogDemo({
  open,
  setOpen,
  linked,
}: {
  open: boolean;
  linked: boolean;
  setOpen: (open: boolean) => void;
}) {
  const direction = useDirection();

  const FormSchema = z.object({
    amount: z.string().min(1, 'Amount needs to be specified'),
    customer: linked
      ? z.string().optional()
      : z.string().min(1, 'Customer needs to be selected'),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '',
      customer: '',
    },
    mode: 'onSubmit',
  });

  function onSubmit() {
    toast.custom((t) => (
      <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
        <AlertIcon>
          <RiCheckboxCircleFill />
        </AlertIcon>
        <AlertTitle>Your feedback successfully submitted</AlertTitle>
      </Alert>
    ));

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        form.reset();
      }}
    >
      <DialogContent className="sm:max-w-md" dir={direction}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Sold Vehicle Process</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {!linked && (
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <Label className="mt-2" htmlFor="customer-select">
                        Link a Customer
                      </Label>
                      <FormControl>
                        <div>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Controller
                              control={form.control}
                              name="customer"
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  inputId="customer-select"
                                  options={customerOptions}
                                  value={
                                    customerOptions.find(
                                      (c) => c.value === value,
                                    ) || null
                                  }
                                  onChange={(selected) =>
                                    onChange(selected ? selected.value : '')
                                  }
                                  placeholder="Search by paddle or mobile number"
                                  isClearable
                                  filterOption={(option, inputValue) => {
                                    const { label, paddle, mobile } =
                                      option.data;
                                    const search = inputValue.toLowerCase();
                                    return (
                                      label.toLowerCase().includes(search) ||
                                      paddle.toLowerCase().includes(search) ||
                                      mobile.toLowerCase().includes(search)
                                    );
                                  }}
                                  formatOptionLabel={(data) => (
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {data.label}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {data.paddle} • {data.mobile}
                                      </span>
                                    </div>
                                  )}
                                  classNames={{
                                    control: () =>
                                      'py-1 border-gray-300 rounded-xl',
                                    menu: () => 'z-50',
                                  }}
                                />
                              )}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <Label className="mt-2" htmlFor="amount">
                      Amount
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        className="border border-black rounded-md p-2"
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="$1000.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
}
