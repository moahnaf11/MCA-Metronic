import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  UserIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TowingRecord {
  date: string;
  from: string;
  to: string;
  driver: string;
  status: string;
}

interface TowingHistoryProps {
  vehicle: {
    towingRecord?: TowingRecord[];
  };
}

const getStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Pending
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Cancelled
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          In Progress
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="capitalize">
          {status}
        </Badge>
      );
  }
};

export function TowingHistory({ vehicle }: TowingHistoryProps) {
  const towingRecords = vehicle.towingRecord?.slice(-3).reverse() || [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <TruckIcon className="h-5 w-5 text-blue-600" />
          Towing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {towingRecords.length > 0 ? (
          <div className="space-y-4">
            {towingRecords.map((record, idx) => (
              <div key={idx}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Date
                          </span>
                          <p className="text-sm font-semibold">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Driver
                          </span>
                          <p className="text-sm font-semibold">
                            {record.driver}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Route
                          </span>
                          <div className="mt-1">
                            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                              From: {record.from}
                            </p>
                            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                              To: {record.to}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <ClockIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Status
                          </span>
                          <div className="mt-1">
                            {getStatusBadge(record.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {idx < towingRecords.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}

            {vehicle.towingRecord && vehicle.towingRecord.length > 3 && (
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Showing latest 3 records of {vehicle.towingRecord.length}{' '}
                  total
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <TruckIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No towing records available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Towing history will appear here once available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
