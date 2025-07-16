import {
  AlertCircleIcon,
  CalendarIcon,
  FileTextIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { TitleInfo } from '@/lib/vehicles';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TitleInformationProps {
  vehicle: {
    titleInfo?: TitleInfo;
  };
}

const getStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'clean':
    case 'clear':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Clean
        </Badge>
      );
    case 'salvage':
    case 'damaged':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 capitalize">
          {status}
        </Badge>
      );
    case 'lien':
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 capitalize">
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

const getTypeIcon = (type: string) => {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes('destruction')) {
    return <AlertCircleIcon className="h-4 w-4 text-red-600" />;
  } else if (normalizedType.includes('salvage')) {
    return <AlertCircleIcon className="h-4 w-4 text-yellow-600" />;
  } else {
    return <FileTextIcon className="h-4 w-4 text-blue-600" />;
  }
};

const getStatusIcon = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === 'clean' || normalizedStatus === 'clear') {
    return <ShieldCheckIcon className="h-4 w-4 text-green-600" />;
  } else {
    return <AlertCircleIcon className="h-4 w-4 text-yellow-600" />;
  }
};

export function TitleInformation({ vehicle }: TitleInformationProps) {
  const titleInfo = vehicle.titleInfo;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileTextIcon className="h-5 w-5 text-blue-600" />
          Title Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {titleInfo ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      State
                    </span>
                    <p className="text-sm font-semibold">{titleInfo.state}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(titleInfo.status)}
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <div className="mt-1">
                      {getStatusBadge(titleInfo.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(titleInfo.documentType)}
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </span>
                    <p className="text-sm font-semibold capitalize">
                      {titleInfo.documentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Received
                    </span>
                    <p className="text-sm font-semibold">
                      {new Date(titleInfo.receivedDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {titleInfo.documentType.toLowerCase().includes('destruction') && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <AlertCircleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                      Certificate of Destruction
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                      This vehicle has been designated for destruction and
                      cannot be rebuilt or re-titled.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileTextIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No title information available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Title information will appear here once available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
