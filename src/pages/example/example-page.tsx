// src/pages/example/example-page.tsx
import { useEffect, useMemo, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  endOfMonth,
  endOfYear,
  format,
  isEqual,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import {
  Calendar,
  CalendarIcon,
  Car,
  CheckCircle,
  Palette,
  User,
  XCircle,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Helmet } from 'react-helmet-async';
import highlightMatch from '@/lib/dataFilters';
import { cn } from '@/lib/utils';
import { PaymentStatus, Vehicle, vehicles } from '@/lib/vehicles';
import { VinCopyButton } from '@/lib/vinCopyButton';
import { Button } from '@/components/ui/button';
import { Calendar as DateRangePicker } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeading,
  CardTitle,
} from '@/components/ui/card';
import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
// import { DataGridTable } from '@/components/ui/data-grid-table';
import { DataGridTableDnd } from '@/components/ui/data-grid-table-dnd';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Portal } from '../archived/Portal';
import DialogDemo from './DialogDemo';
import HistoryDrawer from './HistoryDrawer';

export function ExamplePage() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [globalFilter, setGlobalFilter] = useState(''); // For global search
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'paid' | 'partial' | 'unpaid'
  >('all');
  const [buyNowFilter, setBuyNowFilter] = useState<
    'all' | 'buyNow' | 'auction'
  >('all');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    year: false,
    make: false,
    model: false,
    color: false,
    owner: false,
  });
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [linked, setLinked] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Vehicle | null>(null);

  const paid = vehicles.filter((v) => v.paymentStatus === 'paid').length;
  const partial = vehicles.filter((v) => v.paymentStatus === 'partial').length;
  const unpaid = vehicles.filter((v) => v.paymentStatus === 'unpaid').length;

  const today = new Date();

  // Define preset ranges in an array
  const presets = [
    { label: 'Today', range: { from: today, to: today } },
    {
      label: 'Yesterday',
      range: { from: subDays(today, 1), to: subDays(today, 1) },
    },
    { label: 'Last 7 days', range: { from: subDays(today, 6), to: today } },
    { label: 'Last 30 days', range: { from: subDays(today, 29), to: today } },
    {
      label: 'Month to date',
      range: { from: startOfMonth(today), to: today },
    },
    {
      label: 'Last month',
      range: {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      },
    },
    { label: 'Year to date', range: { from: startOfYear(today), to: today } },
    {
      label: 'Last year',
      range: {
        from: startOfYear(subYears(today, 1)),
        to: endOfYear(subYears(today, 1)),
      },
    },
  ];

  const [month, setMonth] = useState(today);
  const defaultPreset = presets[6];
  const [date, setDate] = useState<DateRange | undefined>(defaultPreset.range); // Default: Last 7 days
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(
    defaultPreset.label,
  );

  const handleApply = () => {
    if (date) {
      setDate(date);
    }
    setIsPopoverOpen(false);
  };
  const handleReset = () => {
    setDate(defaultPreset.range);
    setSelectedPreset(defaultPreset.label);
    setIsPopoverOpen(false);
  };

  const handleSelect = (selected: DateRange | undefined) => {
    setDate({
      from: selected?.from || undefined,
      to: selected?.to || undefined,
    });
    setSelectedPreset(null); // Clear preset when manually selecting a range
  };
  // Update `selectedPreset` whenever `date` changes
  useEffect(() => {
    const matchedPreset = presets.find(
      (preset) =>
        isEqual(
          startOfDay(preset.range.from),
          startOfDay(date?.from || new Date(0)),
        ) &&
        isEqual(
          startOfDay(preset.range.to),
          startOfDay(date?.to || new Date(0)),
        ),
    );
    setSelectedPreset(matchedPreset?.label || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const globalFilterFn = (row: Row<Vehicle>, columnId, filterValue: string) => {
    const searchableFields: (keyof Vehicle)[] = [
      'vin',
      'buyerId',
      'customerName',
      'paddle',
      'run',
      'auction',
      'invoiceNumber',
    ];

    return searchableFields.some((field) => {
      const value = row.original[field];
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  const toggleCarDetails = () => {
    setColumnVisibility((old) => {
      const allVisible =
        old?.year !== false &&
        old?.make !== false &&
        old?.model !== false &&
        old?.color !== false;

      const newVisibility = !allVisible;

      return {
        ...old,
        year: newVisibility,
        make: newVisibility,
        model: newVisibility,
        color: newVisibility,
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  };

  // Define columns for @tanstack/react-table
  const columns = useMemo<ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'id',
        header: ({ column }) => (
          <DataGridColumnHeader title="ID" visibility={true} column={column} />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableHiding: false,
        meta: { headerTitle: 'ID' },
      },
      {
        accessorKey: 'run',
        id: 'run',
        header: 'Run',
        cell: ({ row }) =>
          highlightMatch(row.original.run.toString(), globalFilter),
        enableSorting: true,
        filterFn: 'includesString', // 👈 THIS is the key
        meta: { headerTitle: 'Run' },
      },
      {
        accessorKey: 'vin',
        id: 'vin',
        header: 'VIN',
        cell: ({ row }) => {
          const vehicle = row.original;
          return (
            <TooltipProvider>
              <Tooltip>
                <div className="flex gap-3">
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {highlightMatch(vehicle.vin, globalFilter)}
                    </span>
                  </TooltipTrigger>
                  <VinCopyButton vin={vehicle.vin} />
                </div>

                <Portal>
                  <TooltipContent
                    side="right"
                    sideOffset={40}
                    className="shadow-lg rounded-md p-0"
                  >
                    <Card className="min-w-[500px] rounded-md">
                      <CardHeader>
                        <CardHeading>
                          <CardTitle className="text-lg">Car Details</CardTitle>
                        </CardHeading>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <div>
                              <span className="text-lg uppercase tracking-wide">
                                Year
                              </span>
                              <p className="text-lg font-semibold">
                                {row.original.year}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Car className="w-4 h-4 text-green-500" />
                            <div>
                              <span className="text-lg uppercase tracking-wide">
                                Make & Model
                              </span>
                              <p className="text-lg font-semibold">
                                {row.original.make} {row.original.model}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Palette className="w-4 h-4 text-purple-500" />
                            <div>
                              <span className="text-lg uppercase tracking-wide">
                                Color
                              </span>
                              <p className="text-lg font-semibold">
                                {row.original.color}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <User className="w-4 h-4 text-orange-500" />
                            <div>
                              <span className="text-lg uppercase tracking-wide">
                                Owner/Seller
                              </span>
                              <p className="text-lg font-semibold">
                                {row.original.owner}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Portal>
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'year',
        id: 'year',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Year"
            visibility={true}
            column={column}
          />
        ),
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: true,
      },
      {
        accessorKey: 'make',
        id: 'make',
        header: 'Make',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'model',
        id: 'model',
        header: 'Model',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'color',
        id: 'color',
        header: 'Color',
        cell: (info) => (
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor:
                {
                  WHITE: '#F3F4F6',
                  BLACK: '#1F2937',
                  SILVER: '#D1D5DB',
                  BLUE: '#DBEAFE',
                  RED: '#FEE2E2',
                  GRAY: '#E5E7EB',
                }[info.getValue() as string] || '#E0E7FF',
              color:
                {
                  WHITE: '#374151',
                  BLACK: '#F9FAFB',
                  SILVER: '#4B5563',
                  BLUE: '#1D4ED8',
                  RED: '#B91C1C',
                  GRAY: '#374151',
                }[info.getValue() as string] || '#4338CA',
            }}
          >
            {info.getValue() as string}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'owner',
        id: 'owner',
        header: 'Company/Owner',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'buyNow',
        id: 'buyNow',
        header: 'Buy Now',
        cell: (info) => {
          const isBuyNow = info.getValue() as boolean;
          return isBuyNow ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-gray-300" />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'auction',
        id: 'auction',
        header: 'Auction',
        cell: ({ row }) =>
          highlightMatch(row.original.auction.toString(), globalFilter),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'date',
        id: 'date',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Date"
            column={column}
            visibility={true}
          />
        ),
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: true,
      },
      {
        accessorKey: 'paddle',
        id: 'paddle',
        header: 'Paddle',
        cell: ({ row }) => highlightMatch(row.original.paddle, globalFilter),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'buyerId',
        id: 'buyerId',
        header: 'Buyer ID ',
        cell: ({ row }) => highlightMatch(row.original.buyerId, globalFilter),
        enableSorting: false,
      },
      {
        accessorKey: 'customerName',
        id: 'customerName',
        header: 'Buyer Name',
        cell: ({ row }) =>
          highlightMatch(row.original.customerName, globalFilter),
        enableSorting: false,
      },
      {
        accessorKey: 'invoiceNumber',
        id: 'invoiceNumber',
        header: 'Invoice ID',
        cell: ({ row }) =>
          highlightMatch(row.original.invoiceNumber, globalFilter),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'paymentStatus',
        id: 'paymentStatus',
        header: 'Payment Status',
        cell: ({ row, getValue }) => {
          const status = getValue() as PaymentStatus;

          const statusStyles = {
            paid: { bg: 'bg-green-100', text: 'text-green-800' },
            partial: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
            unpaid: { bg: 'bg-red-100', text: 'text-red-800' },
          };

          const { bg = 'bg-gray-100', text = 'text-gray-800' } =
            statusStyles[status] || {};

          return (
            <button
              type="button"
              onClick={() => {
                if (row.original.paymentStatus !== 'unpaid') {
                  setSelectedRow(row.original);
                  setDrawerOpen(true);
                }
              }}
              className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text} hover:opacity-80 transition`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'soldPrice',
        id: 'soldPrice',
        header: 'Sold Price',
        cell: (info) => `$${(info.getValue() as number).toLocaleString()}`,
        enableSorting: true,
      },
      {
        accessorKey: 'actions',
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const paymentStatus = row.original.paymentStatus;
          const showDollarButton =
            paymentStatus === 'partial' || paymentStatus === 'unpaid';

          return (
            <div className="flex space-x-2 items-center">
              {showDollarButton && (
                <button
                  onClick={() => {
                    setOpen(true);
                    if (row.original.paymentStatus === 'unpaid') {
                      setLinked(false);
                    } else {
                      setLinked(true);
                    }
                  }}
                  className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
                  title="Collect Payment"
                >
                  💲
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [globalFilter],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

  // Initialize the table using useReactTable
  const table = useReactTable<Vehicle>({
    data: useMemo(() => {
      let filtered = data;

      if (buyNowFilter === 'buyNow') {
        filtered = filtered.filter((v) => v.buyNow);
      } else if (buyNowFilter === 'auction') {
        filtered = filtered.filter((v) => !v.buyNow);
      }

      if (date?.from && date?.to) {
        filtered = filtered.filter((v) => {
          const vehicleDate = new Date(v.date);
          return (
            vehicleDate >= new Date(date.from!) &&
            vehicleDate <= new Date(date.to!)
          );
        });
      }

      if (selectedStatus && selectedStatus !== 'all') {
        filtered = filtered.filter((v) => v.paymentStatus === selectedStatus);
      }

      return filtered;
    }, [data, buyNowFilter, date, selectedStatus]),
    columns,
    getRowId: (row: Vehicle) => row.id.toString(),
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const allCarDetailsVisible = ['year', 'make', 'model', 'color'].every(
    (colId) => table.getColumn(colId)?.getIsVisible(),
  );

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
        setData(vehicles); // Use your provided vehicles data
      } catch (err) {
        console.error('Failed to fetch data:', err);
        // In a real app, you might set an error state here
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading vehicle data...
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Example Page | Metronic</title>
      </Helmet>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Sold Vehicles</h1>
            <span>Manage and track all sold vehicle transactions</span>
          </div>
          <div className="flex items-center space-x-3">
            <button>
              <img className="size-6" src="/excel.svg" alt="" />
            </button>
            <button>
              <img className="size-6" src="/csv.svg" alt="" />
            </button>
            <button>
              <img className="size-6" src="/pdf.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card
            onClick={() => setSelectedStatus('all')}
            className={cn(
              'p-3 bg-blue-200 text-blue-800',
              selectedStatus === 'all' && 'ring-2 ring-blue-600',
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl">Total Sold</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-xl">
              <p>{vehicles.length}</p>
            </CardContent>
          </Card>
          <Card
            onClick={() => setSelectedStatus('paid')}
            className={cn(
              'p-3 bg-green-200 text-green-800',
              selectedStatus === 'paid' && 'ring-2 ring-blue-600',
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl">Full Paid</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-xl">
              <p>{paid}</p>
            </CardContent>
          </Card>
          <Card
            onClick={() => setSelectedStatus('partial')}
            className={cn(
              'p-3 bg-orange-200 text-orange-800',
              selectedStatus === 'partial' && 'ring-2 ring-blue-600',
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl">Partial Paid</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-xl">
              <p>{partial}</p>
            </CardContent>
          </Card>
          <Card
            onClick={() => setSelectedStatus('unpaid')}
            className={cn(
              'p-3 bg-red-200 text-red-800',
              selectedStatus === 'unpaid' && 'ring-2 ring-blue-600',
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl">Unpaid</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-xl">
              <p>{unpaid}</p>
            </CardContent>
          </Card>
        </div>

        {/* Global Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <Input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="vin, buyerID, buyerName, paddle..."
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full max-w-sm"
          />
          <div className="flex gap-4 items-center">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  mode="input"
                  placeholder={!date?.from && !date?.to}
                  className="w-[250px]"
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <div className="flex max-sm:flex-col">
                  <div className="relative border-border max-sm:order-1 max-sm:border-t sm:w-32">
                    <div className="h-full border-border sm:border-e py-2">
                      <div className="flex flex-col px-2 gap-[2px]">
                        {presets.map((preset, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="ghost"
                            className={cn(
                              'h-8 w-full justify-start',
                              selectedPreset === preset.label && 'bg-accent',
                            )}
                            onClick={() => {
                              setDate(preset.range);
                              // Update the calendar to show the starting month of the selected range
                              setMonth(preset.range.from || today);
                              setSelectedPreset(preset.label); // Explicitly set the active preset
                            }}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DateRangePicker
                    autoFocus
                    mode="range"
                    month={month}
                    onMonthChange={setMonth}
                    showOutsideDays={false}
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                  />
                </div>
                <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button onClick={handleApply}>Apply</Button>
                </div>
              </PopoverContent>
            </Popover>
            <Select
              defaultValue="all"
              onValueChange={(value) =>
                setBuyNowFilter(value as 'all' | 'buyNow' | 'auction')
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Buy Now filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="buyNow">Buy Now Only</SelectItem>
                <SelectItem value="auction">Auction Only</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                toggleCarDetails();
              }}
              className="text-lg"
              variant="secondary"
            >
              {allCarDetailsVisible ? 'Hide Car Details' : 'Show Car Details'}
            </Button>
          </div>
        </div>

        <div className="grid">
          <DataGrid
            table={table}
            recordCount={table.getFilteredRowModel().rows.length}
            tableLayout={{
              cellBorder: true,
              width: 'auto',
              columnsVisibility: true,
              columnsMovable: true,
              columnsDraggable: true,
              columnsPinnable: true,
            }}
          >
            <div className="w-full space-y-2.5">
              <div className="grid">
                <DataGridContainer>
                  <ScrollArea>
                    <div className="grid">
                      <DataGridTableDnd handleDragEnd={handleDragEnd} />
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </DataGridContainer>
              </div>
              <DataGridPagination />
            </div>
          </DataGrid>
        </div>

        {/* {Dialog Demo} */}
        <DialogDemo open={open} setOpen={setOpen} linked={linked} />
        {/* History Drawer */}
        <HistoryDrawer
          setOpen={setOpen}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectedRow={selectedRow}
          setLinked={setLinked}
        />
      </div>
    </>
  );
}
