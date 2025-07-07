// src/pages/example/example-page.tsx
import { useEffect, useMemo, useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { RiCheckboxCircleFill } from '@remixicon/react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Calendar,
  Car,
  CheckCircle,
  Palette,
  User,
  XCircle,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
// import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
// import { z } from 'zod';
import highlightMatch from '@/lib/dataFilters';
import { cn } from '@/lib/utils';
import { PaymentStatus, Vehicle, vehicles } from '@/lib/vehicles';
// import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeading,
  CardTitle,
} from '@/components/ui/card';
import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
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
import DialogDemo from './DialogDemo';

export function ExamplePage() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(''); // For global search
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'paid' | 'partial' | 'unpaid'
  >('all');
  const [buyNowFilter, setBuyNowFilter] = useState<
    'all' | 'buyNow' | 'auction'
  >('all');
  const [open, setOpen] = useState(false);
  const [linked, setLinked] = useState(false);

  const paid = vehicles.filter((v) => v.paymentStatus === 'paid').length;
  const partial = vehicles.filter((v) => v.paymentStatus === 'partial').length;
  const unpaid = vehicles.filter((v) => v.paymentStatus === 'unpaid').length;

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

  const filteredData = useMemo(() => {
    return data.filter((v) => {
      const paymentMatches =
        selectedStatus === 'all' || v.paymentStatus === selectedStatus;

      const buyNowMatches =
        buyNowFilter === 'all' ||
        (buyNowFilter === 'buyNow' && v.buyNow === true) ||
        (buyNowFilter === 'auction' && v.buyNow === false);

      return paymentMatches && buyNowMatches;
    });
  }, [data, selectedStatus, buyNowFilter]);

  // Define columns for @tanstack/react-table
  const columns = useMemo<ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
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
                  className=" bg-white shadow-lg rounded-md"
                >
                  <Card className="min-w-[500px]">
                    <CardHeader>
                      <CardHeading>
                        <CardTitle className="text-lg">Car Details</CardTitle>
                      </CardHeading>
                    </CardHeader>
                    <CardContent className="">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <div>
                            <span className="text-lg text-gray-500 uppercase tracking-wide">
                              Year
                            </span>
                            <p className="text-lg font-semibold text-gray-800">
                              {row.original.year}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Car className="w-4 h-4 text-green-500" />
                          <div>
                            <span className="text-lg text-gray-500 uppercase tracking-wide">
                              Make & Model
                            </span>
                            <p className="text-lg font-semibold text-gray-800">
                              {row.original.make} {row.original.model}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Palette className="w-4 h-4 text-purple-500" />
                          <div>
                            <span className="text-lg text-gray-500 uppercase tracking-wide">
                              Color
                            </span>
                            <p className="text-lg font-semibold text-gray-800">
                              {row.original.color}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-orange-500" />
                          <div>
                            <span className="text-lg text-gray-500 uppercase tracking-wide">
                              Owner/Seller
                            </span>
                            <p className="text-lg font-semibold text-gray-800">
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
        header: 'Year',
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
        header: 'Date',
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
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        cell: (info) => {
          const status = info.getValue() as PaymentStatus;
          let bgColor = '';
          let textColor = '';
          switch (status) {
            case 'paid':
              bgColor = 'bg-green-100';
              textColor = 'text-green-800';
              break;
            case 'partial':
              bgColor = 'bg-yellow-100';
              textColor = 'text-yellow-800';
              break;
            case 'unpaid':
              bgColor = 'bg-red-100';
              textColor = 'text-red-800';
              break;
            default:
              bgColor = 'bg-gray-100';
              textColor = 'text-gray-800';
          }
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'soldPrice',
        header: 'Sold Price',
        cell: (info) => `$${(info.getValue() as number).toLocaleString()}`,
        enableSorting: true,
      },
      {
        accessorKey: 'actions',
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

  // Initialize the table using useReactTable
  const table = useReactTable<Vehicle>({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Required for global filter
    getSortedRowModel: getSortedRowModel(), // Required for sorting
    getPaginationRowModel: getPaginationRowModel(), // Required for pagination
    debugTable: true, // Set to true for debugging table state
  });

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

  useEffect(() => {
    const columnIdsToToggle = ['year', 'make', 'model', 'color'];
    columnIdsToToggle.forEach((id) => {
      table.getColumn(id)?.toggleVisibility(showCarDetails);
    });
  }, [showCarDetails, table]);

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
                setShowCarDetails((prev) => !prev);
              }}
              className="text-lg text-black"
              variant="secondary"
            >
              {showCarDetails ? 'Hide Car Details' : 'Show Car Details'}
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DataGridContainer className="shadow-md">
          <DataGrid table={table} recordCount={data.length} isLoading={loading}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className={cn(
                            'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none',
                            header.column.getCanSort()
                              ? 'hover:bg-gray-100'
                              : '',
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td></td>
                    {/* for 'id' column or any column you want to keep blank */}
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('run')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table.getColumn('run')?.setFilterValue(e.target.value)
                        }
                        className="input-class"
                        placeholder="Run"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('vin')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table.getColumn('vin')?.setFilterValue(e.target.value)
                        }
                        placeholder="VIN"
                      />
                    </td>
                    {showCarDetails && (
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          value={
                            (table
                              .getColumn('year')
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(e) =>
                            table
                              .getColumn('year')
                              ?.setFilterValue(e.target.value)
                          }
                          placeholder="Year"
                        />
                      </td>
                    )}
                    {showCarDetails && (
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={
                            (table
                              .getColumn('make')
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(e) =>
                            table
                              .getColumn('make')
                              ?.setFilterValue(e.target.value)
                          }
                          placeholder="Make"
                        />
                      </td>
                    )}
                    {showCarDetails && (
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={
                            (table
                              .getColumn('model')
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(e) =>
                            table
                              .getColumn('model')
                              ?.setFilterValue(e.target.value)
                          }
                          placeholder="Model"
                        />
                      </td>
                    )}

                    {showCarDetails && (
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={
                            (table
                              .getColumn('color')
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(e) =>
                            table
                              .getColumn('color')
                              ?.setFilterValue(e.target.value)
                          }
                          placeholder="Color"
                        />
                      </td>
                    )}
                    {showCarDetails && (
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={
                            (table
                              .getColumn('owner')
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(e) =>
                            table
                              .getColumn('owner')
                              ?.setFilterValue(e.target.value)
                          }
                          placeholder="Company/Owner"
                        />
                      </td>
                    )}
                    <td></td>
                    {!showCarDetails && <td></td>}
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('auction')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('auction')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Auction"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="date"
                        value={
                          (table
                            .getColumn('date')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('date')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Date"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('paddle')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('paddle')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Paddle"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('buyerId')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('buyerId')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Buyer ID"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('customerName')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('customerName')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Buyer Name"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={
                          (table
                            .getColumn('invoiceNumber')
                            ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                          table
                            .getColumn('invoiceNumber')
                            ?.setFilterValue(e.target.value)
                        }
                        placeholder="Invoice ID"
                      />
                    </td>
                    <td>{/* actions or blank */}</td>
                  </tr>

                  {table.getRowModel().rows.length === 0 && !loading ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No matching records found.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page{' '}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </strong>
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            </div>
          </DataGrid>
        </DataGridContainer>
        {/* {Dialog Demo} */}
        <DialogDemo open={open} setOpen={setOpen} linked={linked} />
      </div>
    </>
  );
}
