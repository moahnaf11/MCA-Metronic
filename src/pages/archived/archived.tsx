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
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import highlightMatch from '@/lib/dataFilters';
import { cn } from '@/lib/utils';
import {
  GatePassStatus,
  gatePassStatusOptions,
  Vehicle,
  vehicles,
} from '@/lib/vehicles';
import { VinCopyButton } from '@/lib/vinCopyButton';
import { Button } from '@/components/ui/button';
import { Calendar as DateRangePicker } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
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
import HistoryDrawer from '../example/HistoryDrawer';
import EditableCell from './EditableCell';
import EditableSelect from './EditableSelect';
import GatePassDialog from './GatePassDialog';
import { Portal } from './Portal';

export function ArchivedPage() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRow, setSelectedRow] = useState<Vehicle | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
  const [qropen, setQrOpen] = useState(false);
  const [gatePassStatusFilter, setGatePassStatusFilter] = useState('all');

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
        cell: ({ row }) => {
          const rowData = row.original;
          const id = rowData.id;

          return (
            <Link to={`/cars/${id}`} state={{ data: rowData }}>
              {id}
            </Link>
          );
        },
        enableSorting: true,
        meta: { headerTitle: 'ID' },
        enableHiding: false,
      },
      {
        accessorKey: 'run',
        id: 'run',
        header: 'Run',
        cell: (info) => info.getValue(),
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
        cell: EditableCell,
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
        cell: EditableSelect,
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
        accessorKey: 'soldPrice',
        id: 'soldPrice',
        header: 'Sold Price',
        cell: (info) => `$${(info.getValue() as number).toLocaleString()}`,
        enableSorting: false,
      },
      {
        accessorKey: 'gatePassStatus',
        id: 'gatePassStatus',
        cell: ({ row, getValue }) => {
          const status = getValue() as GatePassStatus;

          const statusStyles = {
            'Gate Pass Created': { bg: 'bg-green-100', text: 'text-green-800' },
            'Gate Pass Not Created': {
              bg: 'bg-yellow-100',
              text: 'text-yellow-800',
            },
            'Left Out': { bg: 'bg-red-100', text: 'text-red-800' },
          };

          const { bg = 'bg-gray-100', text = 'text-gray-800' } =
            statusStyles[status] || {};

          return (
            <button
              type="button"
              onClick={() => {
                setSelectedRow(row.original);
                setDrawerOpen(true);
              }}
              className={`px-2 py-1 rounded-md text-xs font-medium ${bg} ${text} hover:opacity-80 transition`}
            >
              {status}
            </button>
          );
        },
        enableSorting: false,
      },
    ],
    [globalFilter],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );
  const table = useReactTable({
    columns,
    data: useMemo(() => {
      let filtered = data;

      if (buyNowFilter === 'buyNow') {
        filtered = filtered.filter((v) => v.buyNow);
      } else if (buyNowFilter === 'auction') {
        filtered = filtered.filter((v) => !v.buyNow);
      }

      if (gatePassStatusFilter && gatePassStatusFilter !== 'all') {
        filtered = filtered.filter(
          (v) => v.gatePassStatus === gatePassStatusFilter,
        );
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

      return filtered;
    }, [data, buyNowFilter, gatePassStatusFilter, date]),
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
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setData(vehicles.filter((v) => v.paymentStatus === 'paid'));
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
            <h1 className="text-2xl font-bold mb-2">Archived Vehicles</h1>
            <span>Manage and track all archived vehicles</span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <Input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="vin, buyerID, buyerName, paddle, run, auction, invoiceID, "
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
              onValueChange={(value) => setGatePassStatusFilter(value)}
            >
              <SelectTrigger className="min-w-max">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {gatePassStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              defaultValue="all"
              onValueChange={(value) =>
                setBuyNowFilter(value as 'all' | 'buyNow' | 'auction')
              }
            >
              <SelectTrigger className="min-w-max">
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
            <DataGridContainer>
              <ScrollArea>
                <DataGridTableDnd handleDragEnd={handleDragEnd} />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </DataGridContainer>
            <DataGridPagination />
          </div>
        </DataGrid>

        <HistoryDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectedRow={selectedRow}
          setQrOpen={setQrOpen}
        />
      </div>

      <GatePassDialog
        qropen={qropen}
        setQrOpen={setQrOpen}
        selectedRow={selectedRow}
      />
    </>
  );
}
