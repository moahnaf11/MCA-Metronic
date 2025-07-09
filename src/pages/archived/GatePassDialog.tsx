import { useDirection } from '@radix-ui/react-direction';
import { Vehicle } from '@/lib/vehicles';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function GatePassDialog({
  qropen,
  setQrOpen,
  selectedRow,
}: {
  qropen: boolean;
  setQrOpen: (qropen: boolean) => void;
  selectedRow: Vehicle | null;
}) {
  const direction = useDirection();

  return (
    <Dialog
      open={qropen}
      onOpenChange={() => {
        setQrOpen(!qropen);
      }}
    >
      <DialogContent className="sm:max-w-md" dir={direction}>
        {/* Accessible title for screen readers only */}
        <DialogTitle asChild>
          <h2 className="sr-only">Gate Pass</h2>
        </DialogTitle>
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Gate Pass: {selectedRow?.gatePass}</CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center">
            <img src="/qr.svg" alt="QR code light mode" className="size-28" />
          </CardContent>
          <CardFooter className="flex">
            <Button className="flex-1 rounded-md">Send</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
