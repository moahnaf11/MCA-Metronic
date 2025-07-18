import { X } from 'lucide-react';
import { Vehicle } from '@/lib/vehicles';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { finalEntry, historyGroups } from './CarHistory';
import LogEntry from './LogEntry';

export default function HistoryDrawer({
  drawerOpen,
  setDrawerOpen,
  selectedRow,
  setLinked,
  setOpen,
  setQrOpen,
}: {
  drawerOpen: boolean;
  setDrawerOpen: (drawerOpen: boolean) => void;
  selectedRow: Vehicle | null;
  setLinked?: (linked: boolean) => void;
  setOpen?: (open: boolean) => void;
  setQrOpen?: (qropen: boolean) => void;
}) {
  return (
    <Drawer
      direction="right"
      open={drawerOpen}
      onOpenChange={() => setDrawerOpen(!drawerOpen)}
    >
      <DrawerContent
        className="w-[80%] md:w-[60%] lg:w-[40%] top-0 bottom-0 mt-4 mb-4 ml-auto
      "
      >
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle>Car History</DrawerTitle>
              <DrawerDescription>VIN: {selectedRow?.vin}</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">
                <X />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* History Content */}
        <div className="p-2 max-h-full overflow-y-auto">
          <div className="space-y-6">
            {selectedRow?.paymentStatus === 'paid' ? (
              historyGroups.map((group, groupIndex) => (
                <div key={group.id} className="space-y-3">
                  {group.entries.map((entry, entryIndex) => (
                    <LogEntry
                      key={entry.id}
                      entry={entry}
                      isLast={
                        entryIndex === group.entries.length - 1 &&
                        groupIndex === historyGroups.length - 1
                      }
                    />
                  ))}

                  {groupIndex < historyGroups.length - 1 && (
                    <div className="flex items-center my-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <div className="px-4 text-xs font-medium">
                        Next Session
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                  )}
                </div>
              )) // ❌ Not Fully Paid: Only show the first entry from the first group
            ) : (
              <div className="space-y-3">
                {historyGroups
                  .find((group) => group.id === 1)
                  ?.entries.map((entry, entryIndex, arr) => (
                    <LogEntry
                      key={entry.id}
                      entry={entry}
                      isLast={entryIndex === arr.length - 1}
                    />
                  ))}
              </div>
            )}

            {/* Final Entry */}
            {((selectedRow?.paymentStatus === 'paid' &&
              selectedRow?.gatePassStatus === 'Gate Pass Created') ||
              selectedRow?.gatePassStatus === 'Left Out') && (
              <div
                onClick={() => setQrOpen?.(true)}
                className="pt-4 border-t-2 border-dashed border-gray-200"
              >
                <LogEntry entry={finalEntry} isLast={true} />
              </div>
            )}
          </div>

          {(selectedRow?.paymentStatus === 'partial' ||
            selectedRow?.paymentStatus === 'unpaid') && (
            <div className="flex mt-4 text-sm justify-center gap-3">
              <Button
                onClick={() => {
                  setLinked?.(selectedRow.paymentStatus === 'partial');
                  setOpen?.(true);
                }}
              >
                Add payment
              </Button>
            </div>
          )}

          <div className="flex mt-4 justify-center gap-3">
            {selectedRow?.gatePassStatus === 'Gate Pass Not Created' && (
              <Button
              // onClick={() => dialogRef.current?.showModal()}
              >
                Create Gate Pass
              </Button>
            )}

            {/* recreate and left out buttons for gatePassStatus === "Gate Pass Created" but not left out */}
            {selectedRow?.gatePassStatus === 'Gate Pass Created' && (
              <div className="flex gap-3">
                <Button
                // onClick={() => dialogRef.current?.showModal()}
                >
                  Re-create Gate Pass
                </Button>
                <Button
                  variant={'mono'}
                  className="bg-green-500 hover:bg-green-700"
                  // onClick={() => dialogRef.current?.showModal()}
                >
                  Left Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
