import { Clock, type LucideIcon } from 'lucide-react';

const LogEntry = ({
  entry,
  isLast = false,
}: {
  entry: {
    id: number;
    action: string;
    value: string;
    actionBy: string;
    timestamp: string;
    type: string;
    icon: LucideIcon;
  };
  isLast: boolean;
}) => {
  const IconComponent = entry.icon;

  const getActionColor = (type: string) => {
    switch (type) {
      case 'action':
        return 'text-red-600';
      case 'payment':
        return 'text-blue-600';
      case 'final':
        return 'text-green-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getActionBgColor = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-red-50 border-red-200';
      case 'payment':
        return 'bg-blue-50 border-blue-200';
      case 'final':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-start space-x-3 p-4 rounded-lg border-2 ${getActionBgColor(
          entry.type,
        )} transition-all duration-200 hover:shadow-md`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            entry.type === 'action'
              ? 'bg-red-100'
              : entry.type === 'payment'
                ? 'bg-blue-100'
                : 'bg-green-100'
          }`}
        >
          <IconComponent className={`w-4 h-4 ${getActionColor(entry.type)}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4
              className={`text-sm font-semibold ${getActionColor(entry.type)}`}
            >
              {entry.action}
            </h4>
            <span className={`text-sm font-bold ${getActionColor(entry.type)}`}>
              {entry.value}
            </span>
          </div>

          {entry.actionBy && (
            <p className="text-xs text-gray-600 mt-1">
              by: <span className="font-medium">{entry.actionBy}</span>
            </p>
          )}

          {entry.timestamp && (
            <div className="flex items-center space-x-1 mt-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{entry.timestamp}</span>
            </div>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="absolute left-7 top-full w-0.5 h-4 bg-gray-300"></div>
      )}
    </div>
  );
};

export default LogEntry;
