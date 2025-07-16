import { faker } from '@faker-js/faker';

type AuctionStatus = 'approved' | 'drafting' | 'requesting for approval';
type AuctionType = 'Live' | 'Online' | 'On-Site & Live Online';
type Emirate = 'Dubai' | 'Sharjah';

export interface AuctionVehicle {
  id: number;
  owner: string;
  auctionId: number;
  vin: string;
  make: string;
  model: string;
  year: number;
  color: string;
  buyNow: boolean;
  auction: number | null;
  soldPrice: number;
  paymentStatus: 'unpaid';
  emirate: Emirate;
  auctionStatus: AuctionStatus;
  auctionType: AuctionType;
  location: string;
}

const auctionStatuses: AuctionStatus[] = [
  'approved',
  'drafting',
  'requesting for approval',
];
const auctionTypes: AuctionType[] = ['Live', 'Online', 'On-Site & Live Online'];
const emirates: Emirate[] = ['Dubai', 'Sharjah'];

function generateAuctionVehicle(id: number): AuctionVehicle {
  return {
    id,
    owner: faker.person.fullName(),
    auctionId: faker.number.int({ min: 1000, max: 9999 }),
    vin: faker.vehicle.vin(),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.date
      .between({ from: new Date('2015-01-01'), to: new Date('2023-12-31') })
      .getFullYear(),
    color: faker.color.human(),
    buyNow: false,
    auction: null,
    soldPrice: 0,
    paymentStatus: 'unpaid',
    emirate: faker.helpers.arrayElement(emirates),
    auctionStatus: faker.helpers.arrayElement(auctionStatuses),
    auctionType: faker.helpers.arrayElement(auctionTypes),
    location:
      faker.helpers.arrayElement(emirates) === 'Dubai'
        ? 'Al Quoz - Dubai'
        : faker.helpers.arrayElement([
            'Sharjah Ind. Area 2',
            'Souq Al Haraj Branch 1',
            'Auto Village, E311',
          ]),
  };
}

export const auctionEligibleVehicles: AuctionVehicle[] = Array.from(
  { length: 75 },
  (_, i) => generateAuctionVehicle(i + 1),
);
