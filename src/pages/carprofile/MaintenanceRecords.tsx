import {
  CalendarIcon,
  ClipboardCheckIcon,
  DollarSignIcon,
  UserIcon,
  WrenchIcon,
} from 'lucide-react';
import { Vehicle } from '@/lib/vehicles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface MaintenanceProps {
  vehicle: Vehicle;
}

export function MaintenanceRecords({ vehicle }: MaintenanceProps) {
  const latestRecords = vehicle.maintenanceRecords?.reverse() ?? [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <WrenchIcon className="h-5 w-5 text-orange-600" />
          Maintenance Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        {latestRecords.length > 0 ? (
          <div className="space-y-4">
            {latestRecords?.map((record, idx) => (
              <div key={idx}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
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
                            Performed By
                          </span>
                          <p className="text-sm font-semibold">
                            {record.performedBy}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <ClipboardCheckIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Description
                          </span>
                          <p className="text-sm font-semibold">
                            {record.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSignIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Cost
                          </span>
                          <p className="text-sm font-semibold">
                            ${record.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {idx < latestRecords.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}

            {/* {latestRecords.length > 3 && (
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Showing latest 3 records of {latestRecords.length} total
                </p>
              </div>
            )} */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <WrenchIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No maintenance records available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Maintenance history will appear here once added
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
