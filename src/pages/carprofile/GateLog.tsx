import {
  CalendarIcon,
  ClockIcon,
  KeyIcon,
  LogInIcon,
  LogOutIcon,
  ShieldIcon,
  UserIcon,
} from 'lucide-react';
import { GateLogEntry } from '@/lib/vehicles';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface GateLogHistoryProps {
  vehicle: {
    gateLog?: GateLogEntry[];
  };
}

const getActionBadge = (action: string) => {
  const normalizedAction = action.toLowerCase();

  switch (normalizedAction) {
    case 'checked-in':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Checked In
        </Badge>
      );
    case 'checked-out':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Checked Out
        </Badge>
      );
    case 'gate-pass-issued':
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          Gate Pass Issued
        </Badge>
      );
    case 'access-granted':
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          Access Granted
        </Badge>
      );
    case 'access-denied':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Access Denied
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="capitalize">
          {action.replace('-', ' ')}
        </Badge>
      );
  }
};

const getActionIcon = (action: string) => {
  const normalizedAction = action.toLowerCase();

  switch (normalizedAction) {
    case 'checked-in':
      return <LogInIcon className="h-4 w-4 text-green-600" />;
    case 'checked-out':
      return <LogOutIcon className="h-4 w-4 text-blue-600" />;
    case 'gate-pass-issued':
      return <KeyIcon className="h-4 w-4 text-purple-600" />;
    default:
      return <ShieldIcon className="h-4 w-4 text-gray-600" />;
  }
};

const getRoleIcon = (role: string) => {
  const normalizedRole = role.toLowerCase();

  switch (normalizedRole) {
    case 'admin':
      return <ShieldIcon className="h-4 w-4 text-red-600" />;
    case 'supervisor':
      return <UserIcon className="h-4 w-4 text-blue-600" />;
    case 'guard':
    case 'guard1':
      return <UserIcon className="h-4 w-4 text-green-600" />;
    default:
      return <UserIcon className="h-4 w-4 text-gray-600" />;
  }
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export function GateLogHistory({ vehicle }: GateLogHistoryProps) {
  const gateLogHistory = vehicle.gateLog?.slice(-5).reverse() || [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ShieldIcon className="h-5 w-5 text-blue-600" />
          Gate Log History
          {gateLogHistory.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {gateLogHistory.length} entries
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {gateLogHistory.length > 0 ? (
          <div className="space-y-4">
            {gateLogHistory.map((entry, idx) => (
              <div key={idx}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getActionBadge(entry.event)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      {formatDateTime(entry.timestamp)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(entry.user)}
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          User
                        </span>
                        <p className="text-sm font-semibold">{entry.user}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Role
                        </span>
                        <p className="text-sm font-semibold capitalize">
                          {entry.user}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    {getActionIcon(entry.event)}
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Action
                      </span>
                      <div className="mt-1">{getActionBadge(entry.event)}</div>
                    </div>
                  </div>

                  {entry.notes && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Note
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 italic">
                            {entry.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {idx < gateLogHistory.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}

            {vehicle.gateLog && vehicle.gateLog.length > 5 && (
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Showing latest 5 entries of {vehicle.gateLog.length}{' '}
                  total
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShieldIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No gate log history available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Gate log entries will appear here once available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
