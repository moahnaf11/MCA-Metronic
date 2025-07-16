import { faker } from '@faker-js/faker';

type AuctionStatus = 'approved' | 'drafting' | 'requesting for approval';
export type AuctionType = 'Live' | 'Online' | 'On-Site & Live Online';
export type Emirate = 'Dubai' | 'Sharjah';

export interface Auction {
  id: number;
  auctionId: number; // auction ID (e.g. 1069)
  auctionDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "6:00 PM"
  endDate: string; // YYYY-MM-DD
  endTime: string; // e.g. "11:30 PM"
  auctionType: AuctionType;
  auctionName: string;
  emirate: Emirate;
  location: string;
  onlineListTime: string; // e.g. "72 Hours"
  startsIn: string; // e.g. "1d 3h 50m"
  selected: number;
  participated: number;
  status: AuctionStatus;
}

export function generateAuction(id: number): Auction {
  const auctionTypes: AuctionType[] = [
    'Live',
    'Online',
    'On-Site & Live Online',
  ];
  const emirates: Emirate[] = ['Dubai', 'Sharjah'];
  const auctionStatuses: AuctionStatus[] = [
    'approved',
    'drafting',
    'requesting for approval',
  ];

  const start = faker.date.soon({ days: 7 });
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // +4 hours
  const listHours = faker.helpers.arrayElement([24, 48, 72, 168]);

  const emirate = faker.helpers.arrayElement(emirates);

  return {
    id,
    auctionId: faker.number.int({ min: 1000, max: 9999 }),
    auctionDate: start.toISOString().split('T')[0],
    startTime: start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endDate: end.toISOString().split('T')[0],
    endTime: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    auctionType: faker.helpers.arrayElement(auctionTypes),
    auctionName: `${faker.helpers.arrayElement(['WEDNESDAY', 'FRIDAY', 'TUESDAY'])} AUCTION ${
      emirate === 'Dubai' ? 'AL QUOZ' : 'SOUQ AL HARAJ'
    } (BRANCH ${faker.number.int({ min: 1, max: 3 })})`,
    emirate,
    location:
      emirate === 'Dubai'
        ? 'Al Quoz - Dubai'
        : faker.helpers.arrayElement([
            'Sharjah Ind. Area 12 Branch',
            'Auto Village-E311, Sharjah',
            'Souq Al Haraj Branch 2',
          ]),
    onlineListTime: `${listHours} Hours`,
    startsIn: `${faker.number.int({ min: 0, max: 3 })}d ${faker.number.int({ min: 0, max: 23 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
    selected: faker.number.int({ min: 0, max: 150 }),
    participated: faker.number.int({ min: 0, max: 300 }),
    status: faker.helpers.arrayElement(auctionStatuses),
  };
}

export const auctionDataArray: Auction[] = Array.from({ length: 75 }, (_, i) =>
  generateAuction(i + 1),
);

export function isAuctionLive(auction: Auction): boolean {
  const now = new Date();

  const start = new Date(`${auction.auctionDate} ${auction.startTime}`);
  const end = new Date(`${auction.endDate} ${auction.endTime}`);

  return now >= start && now <= end;
}

export function isAuctionUpcoming(auction: Auction): boolean {
  const now = new Date();
  const start = new Date(`${auction.auctionDate} ${auction.startTime}`);

  return now < start;
}

export const locationOptions = [
  'SOUQ AL HARAJ',
  'DUBAI AUCTION',
  'ABU DHABI MARKET',
  'SHARJAH CENTER',
  'FUJAIRAH DEPOT',
  'RAS AL KHAIMAH HUB',
] as const;
