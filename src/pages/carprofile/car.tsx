import {
  Calendar,
  Car as CarIcon,
  Palette,
  ShieldCheck,
  User,
  UserRound,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
// import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Vehicle } from '@/lib/vehicles';
import { VinCopyButton } from '@/lib/vinCopyButton';
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Container } from '@/components/common/container';
import { Portal } from '../archived/Portal';
import { About } from '../public-profile/profiles/default';
import AuctionDialog from './AuctionDialog';
import { BidHistory } from './BidHistory';
import CarImages from './CarImages';
import { GateLogHistory } from './GateLog';
import { InspectionReports } from './InspectionReports';
import { MaintenanceRecords } from './MaintenanceRecords';
import { TitleInformation } from './Title';
import { TowingHistory } from './Towing';

const images = ['/car1.png', '/car2.png', '/car3.jpeg'];

const Car = () => {
  const location = useLocation();
  const vehicle: Vehicle = location.state?.data;
  return (
    <Container>
      <TooltipProvider>
        <Tooltip>
          <div className="flex items-center gap-3">
            <TooltipTrigger asChild>
              <span className="cursor-pointer font-bold">
                {vehicle?.year + ' ' + vehicle?.make + ' ' + vehicle?.model}
              </span>
            </TooltipTrigger>
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
                        <p className="text-lg font-semibold">{vehicle.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CarIcon className="w-4 h-4 text-green-500" />
                      <div>
                        <span className="text-lg uppercase tracking-wide">
                          Make & Model
                        </span>
                        <p className="text-lg font-semibold">
                          {vehicle.make} {vehicle.model}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Palette className="w-4 h-4 text-purple-500" />
                      <div>
                        <span className="text-lg uppercase tracking-wide">
                          Color
                        </span>
                        <p className="text-lg font-semibold">{vehicle.color}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-orange-500" />
                      <div>
                        <span className="text-lg uppercase tracking-wide">
                          Owner/Seller
                        </span>
                        <p className="text-lg font-semibold">{vehicle.owner}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipContent>
          </Portal>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-3">
        <span className="text-sm">VIN: {vehicle.vin}</span>
        <VinCopyButton vin={vehicle.vin} />
      </div>
      <Tabs defaultValue="info" className="text-sm text-muted-foreground">
        <TabsList variant="line">
          <TabsTrigger value="info">
            <UserRound /> Car Info
          </TabsTrigger>
          <TabsTrigger value="history">
            <ShieldCheck /> Auction History
          </TabsTrigger>
          <TabsTrigger value="record">
            <ShieldCheck /> Records
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          {/* car info tab info / images / title */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {/* car images */}
            <div className="flex flex-col gap-3">
              <CarImages vehicle={vehicle} images={images} />
              <About vehicle={vehicle} />
            </div>
            {/* Title Info */}
            <div className="col-span-2 flex flex-col gap-3">
              <TitleInformation vehicle={vehicle} />
              {/* Gate Log History */}
              <GateLogHistory vehicle={vehicle} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          {/* Auction History */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-y-5">
                    {vehicle.auctionHistory
                      ?.slice(-5) // ✅ get last 5 items
                      // .reverse() // ✅ optional: most recent on top
                      .map((record) => (
                        <div
                          key={record.auctionId}
                          className="space-y-1 text-sm"
                        >
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
                </CardContent>
                <CardFooter className="justify-center">
                  <Button mode="link" underlined="dashed" asChild>
                    {vehicle.auctionHistory.length > 0 && (
                      <AuctionDialog vehicle={vehicle} />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="col-span-2">
              <BidHistory vehicle={vehicle} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="record">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {/* Towing Records */}
            <div className="grid col-span-2 gap-4">
              <TowingHistory vehicle={vehicle} />
              {/* Inspection Records */}
              <InspectionReports vehicle={vehicle} />
            </div>
            <MaintenanceRecords vehicle={vehicle} />
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Car;

// {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
//         <div className="col-span-1">
//           <div className="flex flex-col gap-4">
//             <CarImages vehicle={vehicle} images={images} />
//             <About vehicle={vehicle} />
// {/* Auction History */}
// <Card>
//   <CardHeader>
//     <CardTitle>Recent Auctions</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <div className="grid gap-y-5">
//       {vehicle.auctionHistory
//         ?.slice(-5) // ✅ get last 5 items
//         // .reverse() // ✅ optional: most recent on top
//         .map((record) => (
//           <div key={record.auctionId} className="space-y-1 text-sm">
//             <div className="flex justify-between">
//               <span className="font-medium text-muted-foreground">
//                 Auction #{record.auctionId}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {new Date(record.date).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Highest Bid:</span>
//               <span className="font-semibold">
//                 ${record.highestBid.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Status:</span>
//               <span
//                 className={
//                   record.sold ? 'text-green-600' : 'text-red-600'
//                 }
//               >
//                 {record.sold
//                   ? `Sold for $${record.soldPrice?.toLocaleString()}`
//                   : 'Not Sold'}
//               </span>
//             </div>
//           </div>
//         ))}
//       {(!vehicle.auctionHistory ||
//         vehicle.auctionHistory.length === 0) && (
//         <p className="text-sm text-gray-400 italic">
//           No auction history available.
//         </p>
//       )}
//     </div>
//   </CardContent>
//   <CardFooter className="justify-center">
//     <Button mode="link" underlined="dashed" asChild>
//       {vehicle.auctionHistory.length > 0 && (
//         <AuctionDialog vehicle={vehicle} />
//       )}
//     </Button>
//   </CardFooter>
// </Card>
//             {/* Gate Log History */}
//             <GateLogHistory vehicle={vehicle} />
//           </div>
//         </div>
//         <div className="col-span-2">
//           <div className="flex flex-col gap-5 lg:gap-7.5">
//             <div className="flex flex-col gap-5 lg:gap-7.5">
//               {/* Towing Records */}
//               <div className="grid gap-4">
//                 <TowingHistory vehicle={vehicle} />
//               </div>
//               <InspectionReports vehicle={vehicle} />
//               <MaintenanceRecords vehicle={vehicle} />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
//               {/* <Contributors /> */}
//               {/* <Contributions title="Assistance" /> */}
//               <div className="col-span-2 space-y-6">
//                 <BidHistory vehicle={vehicle} />
//                 {/* Title Info */}
//                 <TitleInformation vehicle={vehicle} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
