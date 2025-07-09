import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
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
  Calendar,
  Car,
  CheckCircle,
  Palette,
  User,
  XCircle,
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import highlightMatch from '@/lib/dataFilters';
import {
  GatePassStatus,
  gatePassStatusOptions,
  Vehicle,
  vehicles,
} from '@/lib/vehicles';
import { Button } from '@/components/ui/button';
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
import { DataGridTable } from '@/components/ui/data-grid-table';
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
import GatePassDialog from './GatePassDialog';

export function ArchivedPage() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
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

  const globalFilterFn = (row: Row<Vehicle>, columnId, filterValue: string) => {
    const searchableFields: (keyof Vehicle)[] = [
      'vin',
      'buyerId',
      'customerName',
      'paddle',
    ];

    return searchableFields.some((field) => {
      const value = row.original[field];
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  const toggleCarDetails = () => {
    setColumnVisibility((old) => {
      const isVisible = old?.year ?? true;
      return {
        ...old,
        year: !isVisible,
        make: !isVisible,
        model: !isVisible,
        color: !isVisible,
      };
    });
  };

  // Define columns for @tanstack/react-table
  const columns = useMemo<ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: 'id',

        header: ({ column }) => (
          <DataGridColumnHeader title="ID" column={column} />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
        meta: { headerTitle: 'Vehicle ID' },
      },
      {
        accessorKey: 'run',
        header: 'Run',
        cell: (info) => info.getValue(),
        enableSorting: true,
        filterFn: 'includesString', // 👈 THIS is the key
        meta: { headerTitle: 'Run' },
      },
      {
        accessorKey: 'vin',
        header: 'VIN',
        cell: ({ row }) => {
          const vehicle = row.original;
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer">
                    {highlightMatch(vehicle.vin, globalFilter)}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={20}
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
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'year',
        header: ({ column }) => (
          <DataGridColumnHeader title="Year" column={column} />
        ),
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: true,
      },
      {
        accessorKey: 'make',
        header: 'Make',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'model',
        header: 'Model',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'color',
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
        header: 'Company/Owner',
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: 'buyNow',
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
        header: 'Auction',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'date',
        header: ({ column }) => (
          <DataGridColumnHeader title="Date" column={column} />
        ),
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: true,
      },
      {
        accessorKey: 'paddle',
        header: 'Paddle',
        cell: ({ row }) => highlightMatch(row.original.paddle, globalFilter),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'buyerId',
        header: 'Buyer ID ',
        cell: ({ row }) => highlightMatch(row.original.buyerId, globalFilter),
        enableSorting: false,
      },
      {
        accessorKey: 'customerName',
        header: 'Buyer Name',
        cell: ({ row }) =>
          highlightMatch(row.original.customerName, globalFilter),
        enableSorting: false,
      },
      {
        accessorKey: 'invoiceNumber',
        header: 'Invoice ID',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', // 👈 THIS is the key
        enableSorting: false,
      },
      {
        accessorKey: 'soldPrice',
        header: 'Sold Price',
        cell: (info) => `$${(info.getValue() as number).toLocaleString()}`,
        enableSorting: true,
      },
      {
        accessorKey: 'gatePassStatus',
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Gate Pass Status"
            filter={
              <Select
                value={column.getFilterValue() as string}
                defaultValue="all"
                onValueChange={(value) =>
                  column.setFilterValue(value === 'all' ? undefined : value)
                }
              >
                <SelectTrigger className="">
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
            }
          />
        ),
        filterFn: 'equalsString',
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
  const table = useReactTable({
    columns,
    data: useMemo(() => {
      if (buyNowFilter === 'buyNow') return data.filter((v) => v.buyNow);
      if (buyNowFilter === 'auction') return data.filter((v) => !v.buyNow);
      return data;
    }, [data, buyNowFilter]),
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: Vehicle) => row.id.toString(),
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
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
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="vin, buyerID, buyerName, paddle..."
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full max-w-sm"
          />
          <div className="flex gap-4 items-center">
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
              {table.getColumn('year')?.getIsVisible()
                ? 'Hide Car Details'
                : 'Show Car Details'}
            </Button>
          </div>
        </div>

        <DataGrid
          table={table}
          recordCount={data?.length || 0}
          tableLayout={{
            cellBorder: true,
            width: 'auto',
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

        <HistoryDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectedRow={selectedRow}
          setQrOpen={setQrOpen}
        />
      </div>

      <GatePassDialog qropen={qropen} setQrOpen={setQrOpen} selectedRow={selectedRow}  />
    </>
  );
}
