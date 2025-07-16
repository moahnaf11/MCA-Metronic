import {
  AlertTriangleIcon,
  CalendarIcon,
  CarIcon,
  ClipboardCheckIcon,
  UserIcon,
  WrenchIcon,
} from 'lucide-react';
import { InspectionReport } from '@/lib/vehicles';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InspectionReportsProps {
  vehicle: {
    inspectionReport?: InspectionReport[];
  };
}

const getStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'excellent':
    case 'good':
    case 'running':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 capitalize">
          {status}
        </Badge>
      );
    case 'fair':
    case 'average':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 capitalize">
          {status}
        </Badge>
      );
    case 'poor':
    case 'damaged':
    case 'not running':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 capitalize">
          {status}
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

const getStatusIcon = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus.includes('running') ||
    normalizedStatus === 'excellent' ||
    normalizedStatus === 'good'
  ) {
    return <WrenchIcon className="h-4 w-4 text-green-600" />;
  } else if (normalizedStatus === 'fair' || normalizedStatus === 'average') {
    return <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />;
  } else {
    return <AlertTriangleIcon className="h-4 w-4 text-red-600" />;
  }
};

export function InspectionReports({ vehicle }: InspectionReportsProps) {
  const inspectionReports = vehicle.inspectionReport?.slice(-3).reverse() || [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ClipboardCheckIcon className="h-5 w-5 text-blue-600" />
          Inspection Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        {inspectionReports.length > 0 ? (
          <div className="space-y-4">
            {inspectionReports.map((report, idx) => (
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
                            {new Date(report.inspectedOn).toLocaleDateString('en-US', {
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
                            Inspector
                          </span>
                          <p className="text-sm font-semibold">
                            {report.inspector}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CarIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Body Condition
                          </span>
                          <div className="mt-1">
                            {getStatusBadge(report.bodyCondition)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusIcon(report.mechanicalCondition)}
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Mechanical
                          </span>
                          <div className="mt-1">
                            {getStatusBadge(report.mechanicalCondition)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {report.notes && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-start gap-3">
                        <AlertTriangleIcon className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Notes
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 italic">
                            {report.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {idx < inspectionReports.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}

            {vehicle.inspectionReport &&
              vehicle.inspectionReport.length > 3 && (
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Showing latest 3 reports of{' '}
                    {vehicle.inspectionReport.length} total
                  </p>
                </div>
              )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ClipboardCheckIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No inspection reports available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Inspection reports will appear here once available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
