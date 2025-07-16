import React, { useEffect, useState } from 'react';
import { differenceInSeconds, intervalToDuration } from 'date-fns';

export const CountdownCell = React.memo(
  ({ auctionStart }: { auctionStart: Date }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const update = () => {
        const now = new Date();
        const diff = differenceInSeconds(auctionStart, now);
        if (diff <= 0) {
          setTimeLeft('Started');
          return;
        }
        const duration = intervalToDuration({ start: now, end: auctionStart });
        const parts: string[] = [];
        if (duration.days) parts.push(`${duration.days}d`);
        if (duration.hours) parts.push(`${duration.hours}h`);
        if (duration.minutes) parts.push(`${duration.minutes}m`);
        if (duration.seconds || parts.length === 0)
          parts.push(`${duration.seconds ?? 0}s`);
        setTimeLeft(parts.join(' '));
      };

      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
    }, [auctionStart]);

    return <span>{timeLeft}</span>;
  },
);
