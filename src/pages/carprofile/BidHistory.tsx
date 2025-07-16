import {
  ClockIcon,
  DollarSignIcon,
  GavelIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react';
import { BidRecord } from '@/lib/vehicles'; // Adjust the path based on your structure

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BidHistoryProps {
  vehicle: {
    bidHistory?: BidRecord[];
  };
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const getBidRankBadge = (index: number, total: number) => {
  if (index === 0) {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        Highest Bid
      </Badge>
    );
  } else if (index === total - 1) {
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
        Starting Bid
      </Badge>
    );
  } else {
    return <Badge variant="secondary">Bid #{total - index}</Badge>;
  }
};

export function BidHistory({ vehicle }: BidHistoryProps) {
  const bidHistory = vehicle.bidHistory?.slice(-5).reverse() || [];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <GavelIcon className="h-5 w-5 text-blue-600" />
          Bid History
          {bidHistory.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {bidHistory.length} bids
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bidHistory.length > 0 ? (
          <div className="space-y-4">
            {bidHistory.map((bid, idx) => (
              <div key={idx}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getBidRankBadge(idx, bidHistory.length)}
                      {idx === 0 && (
                        <TrendingUpIcon className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(bid.bidAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Bidder ID
                        </span>
                        <p className="text-sm font-semibold">{bid.bidderId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSignIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Paddle
                        </span>
                        <p className="text-sm font-semibold">#{bid.paddleNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Time
                        </span>
                        <p className="text-sm font-semibold">
                          {formatDateTime(bid.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {idx < bidHistory.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            {vehicle.bidHistory && vehicle.bidHistory.length > 5 && (
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Showing latest 5 bids of {vehicle.bidHistory.length} total
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <GavelIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No bid history available
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Bid history will appear here once bidding begins
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
