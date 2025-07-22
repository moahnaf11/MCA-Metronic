import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import {
  BookUser,
  CalendarIcon,
  Check,
  CreditCard,
  ListTodo,
  LoaderCircleIcon,
  X,
} from 'lucide-react';
import Papa from 'papaparse';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuctionVehicle, csv, downloadCSV } from '@/lib/auctionVehicles';
import { combineDateTime } from '@/lib/LocalDateTime';
import { FileWithPreview } from '@/hooks/use-file-upload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import TableUpload from '../auction/FileUploadDialog';
import VehiclesDialog from './VehiclesDialog';

const steps = [
  { title: 'Enter Auction Details', icon: BookUser },
  { title: 'Select Cars', icon: CreditCard },
  { title: 'Preview Form', icon: ListTodo },
];

// Mock time slots data
const timeSlots = [
  { time: '09:00', available: false },
  { time: '09:30', available: false },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: true },
  { time: '12:00', available: false },
  { time: '12:30', available: true },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: false },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true },
  { time: '17:30', available: true },
  { time: '18:00', available: true },
  { time: '18:30', available: true },
  { time: '19:00', available: true },
  { time: '19:30', available: true },
  { time: '20:00', available: true },
  { time: '20:30', available: true },
  { time: '21:00', available: true },
  { time: '21:30', available: true },
  { time: '22:00', available: true },
  { time: '22:30', available: true },
  { time: '23:00', available: true },
  { time: '23:30', available: true },
  { time: '24:00', available: true },
];

export default function CreateAuction() {
  const [currentStep, setCurrentStep] = useState(2);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const [parsedCars, setParsedCars] = useState<AuctionVehicle[]>([]);
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = z
    .object({
      date: z
        .string()
        .nonempty({ message: 'Date is required.' })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Please select a valid date.',
        }),
      time: z.string().nonempty({ message: 'Time is required.' }),

      enddate: z
        .string()
        .nonempty({ message: 'Date is required.' })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Please select a valid date.',
        }),
      endtime: z.string().nonempty({ message: 'Time is required.' }),

      name: z.string().min(1, 'Auction name is required'),
      index: z.string().min(1, 'Index is required'),
      emirate: z.string().min(1, 'Emirate is required'),
      location: z.string().min(1, 'Location is required'),
    })
    .refine(
      (data) => {
        // Don't run validation if any of the required fields are missing
        if (!data.date || !data.time || !data.enddate || !data.endtime) {
          return true; // Skip this validation — treat as valid for now
        }

        const start = combineDateTime(data.date, data.time);
        const end = combineDateTime(data.enddate, data.endtime);
        return end > start;
      },
      {
        message: 'End date and time cannot be before start date and time',
        path: ['enddate'], // or ['endtime'], or keep as is
      },
    );

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '9:30',
      enddate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      endtime: '10:30',
      index: '',
      name: '',
      emirate: '',
      location: '',
    },
  });

  const handleNext = async () => {
    // Define fields to validate based on the current step
    const fieldsPerStep: Record<number, (keyof z.infer<typeof schema>)[]> = {
      1: [
        'date',
        'time',
        'index',
        'name',
        'emirate',
        'location',
        'enddate',
        'endtime',
      ],
      2: [],
    };

    const fieldsToValidate = fieldsPerStep[currentStep];

    if (!fieldsToValidate) {
      // No fields to validate on this step (like step 4)
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const isStepValid = await methods.trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (uploadedFiles.length === 0) return;

    const file = uploadedFiles[0].file;
    if (!(file instanceof File)) return;

    Papa.parse<AuctionVehicle>(file, {
      header: true, // expects first row to be column names
      skipEmptyLines: true,
      complete: (result) => {
        console.log('Parsed CSV result:', result.data);
        setParsedCars(result.data); // store for table rendering
        setOpen(true);
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      },
    });
  }, [uploadedFiles]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Create Auctions</h1>
          <span>Create Auctions</span>
        </div>
      </div>

      <FormProvider {...methods}>
        <Form {...methods}>
          <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
            indicators={{
              completed: <Check className="size-4" />,
              loading: <LoaderCircleIcon className="size-4 animate-spin" />,
            }}
            className="space-y-8"
          >
            <StepperNav className="gap-3 mb-15">
              {steps.map((step, index) => {
                return (
                  <StepperItem
                    key={index}
                    step={index + 1}
                    className="relative flex-1 items-start"
                  >
                    <StepperTrigger
                      className="flex flex-col items-start justify-center gap-2.5 grow"
                      asChild
                    >
                      <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                        <step.icon className="size-4" />
                      </StepperIndicator>
                      <div className="flex flex-col items-start gap-1">
                        <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                          Step {index + 1}
                        </div>
                        <StepperTitle className="text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                          {step.title}
                        </StepperTitle>
                        <div>
                          <Badge
                            variant="primary"
                            size="sm"
                            appearance="light"
                            className="hidden group-data-[state=active]/step:inline-flex"
                          >
                            In Progress
                          </Badge>

                          <Badge
                            variant="success"
                            size="sm"
                            appearance="light"
                            className="hidden group-data-[state=completed]/step:inline-flex"
                          >
                            Completed
                          </Badge>

                          <Badge
                            variant="secondary"
                            size="sm"
                            className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground"
                          >
                            Pending
                          </Badge>
                        </div>
                      </div>
                    </StepperTrigger>

                    {steps.length > index + 1 && (
                      <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500" />
                    )}
                  </StepperItem>
                );
              })}
            </StepperNav>

            {/* StepperContent */}
            <StepperPanel className="text-sm">
              <StepperContent
                className="flex max-w-[50%] flex-col gap-6"
                value={1}
              >
                <FormField
                  name="index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Index Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center gap-3">
                  <FormField
                    control={methods.control}
                    name="date"
                    render={({ field }) => {
                      const timeError = methods.formState.errors.time?.message;
                      return (
                        <FormItem>
                          <FormLabel>Auction Start Date & Time</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="relative w-[250px]">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    mode="input"
                                    className="w-full"
                                  >
                                    <CalendarIcon />
                                    {field.value || methods.watch('time') ? (
                                      <span>
                                        {field.value
                                          ? format(field.value, 'PPP')
                                          : 'Pick a date'}
                                        {' - '}
                                        {methods.watch('time')
                                          ? methods.watch('time')
                                          : 'Pick a time'}
                                      </span>
                                    ) : (
                                      <span>Pick a date and time</span>
                                    )}
                                  </Button>
                                  {(field.value || methods.watch('time')) && (
                                    <Button
                                      type="button"
                                      variant="dim"
                                      size="sm"
                                      className="absolute top-1/2 -end-0 -translate-y-1/2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        methods.setValue('date', '', {
                                          shouldValidate: true,
                                        });
                                        methods.setValue('time', '', {
                                          shouldValidate: true,
                                        });
                                      }}
                                    >
                                      <X />
                                    </Button>
                                  )}
                                </div>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <div className="flex max-sm:flex-col">
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      if (!date) return;
                                      const dateOnly = format(
                                        date,
                                        'yyyy-MM-dd',
                                      ); // Local time format
                                      methods.setValue('date', dateOnly, {
                                        shouldValidate: true,
                                      });
                                      methods.trigger('enddate');
                                    }}
                                    autoFocus
                                    disabled={[{ before: today }]}
                                  />
                                  <div className="relative w-full max-sm:h-48 sm:w-40">
                                    <div className="absolute inset-0 py-4 max-sm:border-t">
                                      <ScrollArea className="h-full sm:border-s">
                                        <div className="space-y-3">
                                          <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                                            {timeSlots.map(
                                              ({
                                                time: timeSlot,
                                                available,
                                              }) => (
                                                <Button
                                                  key={timeSlot}
                                                  variant="primary"
                                                  size="sm"
                                                  className="w-full"
                                                  onClick={() => {
                                                    methods.setValue(
                                                      'time',
                                                      timeSlot,
                                                      { shouldValidate: true },
                                                    );
                                                    methods.trigger('enddate');
                                                  }}
                                                  disabled={!available}
                                                >
                                                  {timeSlot}
                                                </Button>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <div className="flex items-center gap-3">
                            <FormMessage />
                            {/* This manually shows the time error */}
                            {timeError && (
                              <div
                                data-slot="form-message"
                                className="-mt-0.5 text-xs font-normal text-destructive"
                              >
                                {timeError}
                              </div>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                  {/* end date and time */}
                  <FormField
                    control={methods.control}
                    name="enddate"
                    render={({ field }) => {
                      const timeError =
                        methods.formState.errors.endtime?.message;
                      return (
                        <FormItem>
                          <FormLabel>Auction End Date & Time</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="relative w-[250px]">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    mode="input"
                                    className="w-full"
                                  >
                                    <CalendarIcon />
                                    {field.value || methods.watch('endtime') ? (
                                      <span>
                                        {field.value
                                          ? format(field.value, 'PPP')
                                          : 'Pick a date'}
                                        {' - '}
                                        {methods.watch('endtime')
                                          ? methods.watch('endtime')
                                          : 'Pick a time'}
                                      </span>
                                    ) : (
                                      <span>Pick a date and time</span>
                                    )}
                                  </Button>
                                  {(field.value ||
                                    methods.watch('endtime')) && (
                                    <Button
                                      type="button"
                                      variant="dim"
                                      size="sm"
                                      className="absolute top-1/2 -end-0 -translate-y-1/2"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        methods.setValue('enddate', '', {
                                          shouldValidate: true,
                                        });
                                        methods.setValue('endtime', '', {
                                          shouldValidate: true,
                                        });
                                      }}
                                    >
                                      <X />
                                    </Button>
                                  )}
                                </div>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <div className="flex max-sm:flex-col">
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      if (!date) return;
                                      const dateOnly = format(
                                        date,
                                        'yyyy-MM-dd',
                                      ); // Local time format
                                      methods.setValue('enddate', dateOnly, {
                                        shouldValidate: true,
                                      });

                                      if (methods.watch('endtime')) {
                                        methods.trigger('enddate');
                                      }
                                    }}
                                    autoFocus
                                    disabled={[{ before: today }]}
                                  />
                                  <div className="relative w-full max-sm:h-48 sm:w-40">
                                    <div className="absolute inset-0 py-4 max-sm:border-t">
                                      <ScrollArea className="h-full sm:border-s">
                                        <div className="space-y-3">
                                          <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                                            {timeSlots.map(
                                              ({
                                                time: timeSlot,
                                                available,
                                              }) => (
                                                <Button
                                                  key={timeSlot}
                                                  variant="primary"
                                                  size="sm"
                                                  className="w-full"
                                                  onClick={() => {
                                                    methods.setValue(
                                                      'endtime',
                                                      timeSlot,
                                                      { shouldValidate: true },
                                                    );
                                                    methods.trigger('enddate');
                                                  }}
                                                  disabled={!available}
                                                >
                                                  {timeSlot}
                                                </Button>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <div className="flex items-center gap-3">
                            <FormMessage />
                            {/* This manually shows the time error */}
                            {timeError && (
                              <div
                                data-slot="form-message"
                                className="-mt-0.5 text-xs font-normal text-destructive"
                              >
                                {timeError}
                              </div>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="flex justify-center gap-3">
                  <FormField
                    name="emirate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Emirate</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // update emirate
                              // Reset location immediately on emirate change
                              methods.setValue('location', '');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Emirate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dubai">Dubai</SelectItem>
                              <SelectItem value="Sharjah">Sharjah</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* emirate location */}
                  <FormField
                    name="location"
                    render={({ field }) => {
                      const selectedEmirate = methods.watch('emirate');
                      return (
                        <FormItem>
                          <FormLabel>Select Location</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value || ''}
                              onValueChange={field.onChange}
                              disabled={!selectedEmirate}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Location" />
                              </SelectTrigger>
                              <SelectContent>
                                {(!selectedEmirate ||
                                  selectedEmirate === 'Dubai') && (
                                  <SelectGroup>
                                    <SelectLabel>Dubai</SelectLabel>
                                    <SelectItem value="alquoz">
                                      Al Quoz
                                    </SelectItem>
                                  </SelectGroup>
                                )}
                                <SelectSeparator />
                                {(!selectedEmirate ||
                                  selectedEmirate === 'Sharjah') && (
                                  <SelectGroup>
                                    <SelectLabel>Sharjah</SelectLabel>
                                    <SelectItem value="ia2">
                                      247 BMW Road, Industrial Area 2
                                    </SelectItem>
                                    <SelectItem value="sah">
                                      801/294 Souq Al Haraj, Auto Village, E311
                                    </SelectItem>
                                    <SelectItem value="ia12">
                                      Industrial Area 12 Branch
                                    </SelectItem>
                                  </SelectGroup>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auction Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Auction Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </StepperContent>

              <StepperContent value={2}>
                <Button onClick={() => downloadCSV(csv)}>csv</Button>
                <TableUpload
                  maxSize={10000000}
                  maxFiles={1}
                  onFilesChange={(files) => setUploadedFiles(files)}
                />
                <VehiclesDialog
                  open={open}
                  setOpen={setOpen}
                  parsedCars={parsedCars}
                />
              </StepperContent>

              <StepperContent value={3}>
                <div className="text-left">
                  <h2 className="text-lg font-semibold mb-4">Preview:</h2>
                  <pre className="bg-muted p-4 rounded">
                    {JSON.stringify(methods.getValues(), null, 2)}
                  </pre>
                </div>
              </StepperContent>
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={
                  currentStep === steps.length ||
                  (currentStep === 2 && uploadedFiles.length === 0)
                }
              >
                Next
              </Button>
            </div>
          </Stepper>
        </Form>
      </FormProvider>
    </div>
  );
}
