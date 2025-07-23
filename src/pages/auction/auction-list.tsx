import { useEffect, useMemo, useState } from 'react';
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
} from '@tanstack/react-table';
import {
  addDays,
  addMonths,
  differenceInSeconds,
  endOfMonth,
  // endOfYear,
  format,
  isEqual,
  startOfDay,
  startOfMonth,
  // startOfYear,
  // subDays,
  // subMonths,
  // subYears,
} from 'date-fns';
import { CalendarIcon, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { DateRange } from 'react-day-picker';
import {
  Auction,
  auctionDataArray,
  AuctionType,
  Emirate,
  isAuctionLive,
  isAuctionUpcoming,
} from '@/lib/auctionData';
import highlightMatch from '@/lib/dataFilters';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar as DateRangePicker } from '@/components/ui/calendar';
import { CardTitle } from '@/components/ui/card';
import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { CountdownCell } from './Countdown';
import TableUpload from './FileUploadDialog';
import LocationDialog from './LocationDialog';

const AuctionList = () => {
  const [data, setData] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [auctionType, setAuctionType] = useState<'all' | AuctionType>('all');
  const [emirateType, setEmirateType] = useState<'all' | Emirate>('all');
  const [auctionStatus, setAuctionStatus] = useState<
    'all' | 'live' | 'upcoming'
  >('all');

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const today = new Date();

  // Define preset ranges in an array
  const presets = [
    {
      label: 'Today',
      range: { from: today, to: today },
    },
    {
      label: 'Tomorrow',
      range: { from: addDays(today, 1), to: addDays(today, 1) },
    },
    {
      label: 'Next 3 days',
      range: { from: today, to: addDays(today, 2) },
    },
    {
      label: 'Next 7 days',
      range: { from: today, to: addDays(today, 6) },
    },
    {
      label: 'Next 14 days',
      range: { from: today, to: addDays(today, 13) },
    },
    {
      label: 'Rest of this month',
      range: { from: today, to: endOfMonth(today) },
    },
    {
      label: 'Next month',
      range: {
        from: startOfMonth(addMonths(today, 1)),
        to: endOfMonth(addMonths(today, 1)),
      },
    },
  ];

  const [month, setMonth] = useState(today);
  // const defaultPreset = presets[3];
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(
    'Select Date Range',
  );

  const handleApply = () => {
    if (date) {
      setDate(date);
    }
    setIsPopoverOpen(false);
  };
  const handleReset = () => {
    setDate(undefined);
    setSelectedPreset('Select Date Range');
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

  const globalFilterFn = (row: Row<Auction>, columnId, filterValue: string) => {
    const searchableFields: (keyof Auction)[] = ['auctionId'];

    return searchableFields.some((field) => {
      const value = row.original[field];
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  function resetFilters() {
    setGlobalFilter('');
    setAuctionType('all');
    setEmirateType('all');
    setAuctionStatus('all');
    setDate(undefined); // Or set to undefined if you want to fully clear the date
  }

  const columns = useMemo<ColumnDef<Auction>[]>(
    () => [
      {
        header: ({ column }) => (
          <DataGridColumnHeader title="ID" visibility={true} column={column} />
        ),
        accessorKey: 'id',
        id: 'id',
        enableHiding: false,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Auction ID"
            visibility={true}
            column={column}
          />
        ),
        id: 'auctionId',
        accessorKey: 'auctionId',
        cell: ({ row }) => {
          return (
            <span>
              {highlightMatch(row.original.auctionId.toString(), globalFilter)}
            </span>
          );
        },
        enableSorting: true,
        enablePinning: true,
        enableHiding: false,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Auction Date"
            visibility={true}
            column={column}
          />
        ),
        id: 'auctionDate',
        accessorKey: 'auctionDate',
        enableSorting: true,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Start Time"
            visibility={true}
            column={column}
          />
        ),
        id: 'startTime',
        accessorKey: 'startTime',
        enableSorting: true,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="End Date"
            visibility={true}
            column={column}
          />
        ),
        id: 'endDate',
        accessorKey: 'endDate',
        enableSorting: true,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="End Time"
            visibility={true}
            column={column}
          />
        ),
        id: 'endTime',
        accessorKey: 'endTime',
        enableSorting: true,
      },
      {
        header: 'Auction Type',
        id: 'auctionType',
        accessorKey: 'auctionType',
      },
      {
        header: 'Auction Name',
        id: 'auctionName',
        accessorKey: 'auctionName',
        cell: ({ getValue }) => (
          <span className="text-blue-700 font-medium hover:underline cursor-pointer">
            {getValue<string>()}
          </span>
        ),
      },
      {
        header: 'Emirates',
        id: 'emirate',
        accessorKey: 'emirate',
      },
      {
        header: 'Location',
        id: 'location',
        accessorKey: 'location',
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Online List Time"
            visibility={true}
            column={column}
          />
        ),
        id: 'onlineListTime',
        accessorKey: 'onlineListTime',
        enableSorting: true,
      },
      {
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Starts In"
            visibility={true}
            column={column}
          />
        ),
        id: 'startsIn',
        accessorKey: 'startsIn',
        accessorFn: (row) => {
          const now = new Date();
          const auctionStart = new Date(`${row.auctionDate} ${row.startTime}`);
          const diffInSec = differenceInSeconds(auctionStart, now);
          return diffInSec <= 0 ? -1 : diffInSec;
        },
        enableSorting: true,
        cell: ({ row }) => {
          const auctionStart = new Date(
            `${row.original.auctionDate} ${row.original.startTime}`,
          );
          return <CountdownCell auctionStart={auctionStart} />;
        },
      },
      {
        header: 'Selected',
        id: 'selected',
        accessorKey: 'selected',
      },
      {
        header: 'Participated',
        id: 'participated',
        accessorKey: 'participated',
      },
      {
        header: 'Auction Status',
        id: 'status',
        accessorKey: 'status',
        cell: ({ getValue }) => {
          const value = getValue<Auction['status']>();
          const colorMap = {
            approved: 'green',
            drafting: 'yellow',
            'requesting for approval': 'blue',
          };

          return (
            <div
              className={`px-2 py-1 rounded-md text-center bg-${colorMap[value]}-100 text-${colorMap[value]}-800 hover:bg-${colorMap[value]}-200`}
            >
              {value}
            </div>
          );
        },
      },
      {
        header: 'Action',
        id: 'action',
        cell: () => (
          <div className="flex items-center gap-2">
            <LocationDialog />
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary" className="size-8">
                  <FileText className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-max">
                <DialogHeader>
                  <DialogTitle>Upload Auction & Run Lists</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <div className="flex gap-7">
                    <div className="flex shrink-0 flex-1 flex-col">
                      <CardTitle>Auctions List</CardTitle>
                      <TableUpload maxSize={10000000} maxFiles={1} />
                    </div>
                    <div className="flex shrink-0 flex-1 flex-col">
                      <CardTitle>Run List</CardTitle>
                      <TableUpload maxSize={10000000} maxFiles={1} />
                    </div>
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
              </DialogContent>
            </Dialog>
          </div>
        ),
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
      return data.filter((v) => {
        const auctionStart = new Date(`${v.auctionDate} ${v.startTime}`);

        const matchesAuctionType =
          auctionType === 'all' || v.auctionType === auctionType;

        const matchesEmirateType =
          emirateType === 'all' || v.emirate === emirateType;

        const matchesAuctionStatus =
          auctionStatus === 'all' ||
          (auctionStatus === 'live' && isAuctionLive(v)) ||
          (auctionStatus === 'upcoming' && isAuctionUpcoming(v));

        const matchesDateRange =
          !date?.from ||
          !date?.to ||
          (auctionStart >= new Date(date.from) &&
            auctionStart <= new Date(date.to));

        return (
          matchesAuctionType &&
          matchesEmirateType &&
          matchesAuctionStatus &&
          matchesDateRange
        );
      });
    }, [data, auctionType, emirateType, auctionStatus, date]),
    // pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: Auction) => row.id.toString(),
    state: {
      pagination,
      globalFilter,
      sorting,
      columnOrder,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setData(auctionDataArray); // Use your provided vehicles data
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
          Loading auctions list...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between">
        <div className=''>
          <h1 className="text-2xl font-bold mb-2">Auctions List</h1>
          <span>Manage and track auction lists</span>
        </div>
        <Link to='/auctions/new' className='flex items-center'>
          <Button type='button'><Plus /> New</Button>
        </Link>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Auction ID"
          className="mb-4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full max-w-sm"
        />
        <div className="flex flex-col gap-3">
          {/* live and upcoming filters */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setAuctionStatus('live')}
              className={cn(
                'bg-green-300',
                auctionStatus === 'live' && 'border-2 border-blue-600',
              )}
              variant="secondary"
            >
              Live ({data.filter(isAuctionLive).length})
            </Button>

            <Button
              onClick={() => setAuctionStatus('upcoming')}
              className={cn(
                'bg-yellow-500',
                auctionStatus === 'upcoming' && 'border-2 border-blue-600',
              )}
              variant="secondary"
            >
              Upcoming ({data.filter(isAuctionUpcoming).length})
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            {/* date range */}
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
                  <div className="relative border-border max-sm:order-1 max-sm:border-t sm:w-36">
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
            {/* auction type filter */}
            <Select
              defaultValue="all"
              onValueChange={(value) =>
                setAuctionType(value as 'all' | AuctionType)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Auction Type Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Auction Types</SelectItem>
                <SelectItem value="Live">On-Site Auction</SelectItem>
                <SelectItem value="Online">Live Online Auction</SelectItem>
                <SelectItem value="On-Site & Live Online">
                  On-Site & Live Online Auction
                </SelectItem>
              </SelectContent>
            </Select>
            {/* emirate filter */}
            <Select
              defaultValue="all"
              onValueChange={(value) =>
                setEmirateType(value as 'all' | Emirate)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Emirate Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Emirates</SelectItem>
                <SelectItem value="Dubai">Dubai</SelectItem>
                <SelectItem value="Sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>

            {/* reset button */}
            <Button
              variant="destructive"
              className="ml-2"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      <DataGrid
        table={table}
        recordCount={table.getFilteredRowModel().rows.length}
        tableLayout={{
          width: 'auto',
          cellBorder: true,
          columnsPinnable: true,
          columnsResizable: true,
          columnsMovable: true,
          columnsVisibility: true,
        }}
      >
        <div className="w-full space-y-2.5">
          <DataGridContainer>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    </div>
  );
};

export default AuctionList;
