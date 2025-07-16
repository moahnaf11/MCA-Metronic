import { Images } from 'lucide-react';
import { Vehicle } from '@/lib/vehicles';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import DialogContent, {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type AuctionDialogProps = {
  vehicle: Vehicle;
};

const AuctionDialog = ({ vehicle }: AuctionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>See All Auctions</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full rounded-md">
        <DialogHeader>
          <DialogTitle>All Auctions</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ScrollArea>
            <div className="grid gap-y-5">
              {vehicle.auctionHistory.map((record) => (
                <div key={record.auctionId} className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">
                      Auction #{record.auctionId}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Bid:</span>
                    <span className="font-semibold">
                      ${record.highestBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={
                        record.sold ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {record.sold
                        ? `Sold for $${record.soldPrice?.toLocaleString()}`
                        : 'Not Sold'}
                    </span>
                  </div>
                </div>
              ))}
              {(!vehicle.auctionHistory ||
                vehicle.auctionHistory.length === 0) && (
                <p className="text-sm text-gray-400 italic">
                  No auction history available.
                </p>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuctionDialog;
