import { useMemo, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useDirection } from '@radix-ui/react-direction';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { AuctionVehicle } from '@/lib/auctionVehicles';
import { Button } from '@/components/ui/button';
import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTableDnd } from '@/components/ui/data-grid-table-dnd';
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditableCell from '../../lib/EditableCell';
import EditableSelect from '../../lib/EditableSelect';
import AddCarsDialog from './AddCarsDialog';

type VehiclesDialogProps = {
  open: boolean;
  setOpen: (openstate: boolean) => void;
  parsedCars: AuctionVehicle[] | [];
};

const VehiclesDialog = ({ open, setOpen, parsedCars }: VehiclesDialogProps) => {
  const direction = useDirection();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    year: true,
    make: true,
    model: true,
    color: true,
  });

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
  const columns = useMemo<ColumnDef<AuctionVehicle, string>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'id',
        header: ({ column }) => (
          <DataGridColumnHeader title="ID" visibility={true} column={column} />
        ),
        cell: ({ row }) => row.original.id,
        enableSorting: true,
      },
      {
        accessorKey: 'vin',
        id: 'vin',
        header: 'VIN',
        cell: ({ row }) => row.original.vin,
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
        cell: EditableCell,
        enableSorting: false,
      },
      {
        accessorKey: 'color',
        id: 'color',
        header: 'Color',
        cell: EditableSelect,
        enableSorting: false,
      },
    ],
    [],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

  // Initialize the table using useReactTable
  const table = useReactTable<AuctionVehicle>({
    data: parsedCars,
    columns,
    getRowId: (row: AuctionVehicle) => row.id?.toString(),
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogContent
        close={false}
        dir={direction}
        className="min-w-max max-h-[90%]"
      >
        <DialogHeader className="flex flex-row justify-between items-center gap-3">
          <DialogTitle>Cars Table for Auction</DialogTitle>
          <AddCarsDialog />
        </DialogHeader>
        <ScrollArea className="overflow-y-auto">
          <DialogBody className="">
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
                  <DataGridTableDnd handleDragEnd={handleDragEnd} />
                </DataGridContainer>
                <DataGridPagination />
              </div>
            </DataGrid>
          </DialogBody>
        </ScrollArea>

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
  );
};

export default VehiclesDialog;
