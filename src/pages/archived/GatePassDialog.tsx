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
            <svg
              className="dark:fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M3 9h6V3H3zm1-5h4v4H4zm1 1h2v2H5zm10 4h6V3h-6zm1-5h4v4h-4zm1 1h2v2h-2zM3 21h6v-6H3zm1-5h4v4H4zm1 1h2v2H5zm15 2h1v2h-2v-3h1zm0-3h1v1h-1zm0-1v1h-1v-1zm-10 2h1v4h-1v-4zm-4-7v2H4v-1H3v-1h3zm4-3h1v1h-1zm3-3v2h-1V3h2v1zm-3 0h1v1h-1zm10 8h1v2h-2v-1h1zm-1-2v1h-2v2h-2v-1h1v-2h3zm-7 4h-1v-1h-1v-1h2v2zm6 2h1v1h-1zm2-5v1h-1v-1zm-9 3v1h-1v-1zm6 5h1v2h-2v-2zm-3 0h1v1h-1v1h-2v-1h1v-1zm0-1v-1h2v1zm0-5h1v3h-1v1h-1v1h-1v-2h-1v-1h3v-1h-1v-1zm-9 0v1H4v-1zm12 4h-1v-1h1zm1-2h-2v-1h2zM8 10h1v1H8v1h1v2H8v-1H7v1H6v-2h1v-2zm3 0V8h3v3h-2v-1h1V9h-1v1zm0-4h1v1h-1zm-1 4h1v1h-1zm3-3V6h1v1z"></path>
                <path fill="none" d="M0 0h24v24H0z"></path>
              </g>
            </svg>
          </CardContent>
          <CardFooter className="flex">
            <Button className="flex-1 rounded-md">Send</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
