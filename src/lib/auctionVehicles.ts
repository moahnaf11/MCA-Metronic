import { faker } from '@faker-js/faker';

type AuctionStatus = 'approved' | 'drafting' | 'requesting for approval';
type AuctionType = 'Live' | 'Online' | 'On-Site & Live Online';
type Emirate = 'Dubai' | 'Sharjah';

export interface AuctionVehicle {
  id: number;
  owner: string;
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
    vin: faker.vehicle.vin(),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.date
      .between({ from: new Date('2015-01-01'), to: new Date('2023-12-31') })
      .getFullYear(),
    color: faker.helpers.arrayElement([
      'WHITE',
      'BLACK',
      'SILVER',
      'BLUE',
      'RED',
      'GRAY',
    ] as const),
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

// generate CSV
export function generateVehicleCSV(vehicles: AuctionVehicle[]): string {
  const headers = [
    'id',
    'make',
    'model',
    'year',
    'color',
    'vin',
    'mileage',
    'condition',
    'estimated value',
    'reserve price',
    'description',
    'lot number',
  ];

  const rows = vehicles.map((v, idx) => [
    v.id,
    v.make,
    v.model,
    v.year.toString(),
    v.color,
    v.vin,
    faker.number.int({ min: 10000, max: 200000 }).toString(), // Mileage
    faker.helpers.arrayElement(['Excellent', 'Good', 'Fair', 'Poor']),
    faker.number.int({ min: 10000, max: 50000 }).toString(), // Estimated Value
    faker.number.int({ min: 5000, max: 40000 }).toString(), // Reserve Price
    faker.commerce.productDescription(),
    `LOT-${idx + 1}`,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((val) => `"${val}"`).join(','))
    .join('\n');

  return csvContent;
}

// download csv
export function downloadCSV(csv: string, filename = 'vehicles.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url);
}

export const csv = generateVehicleCSV(auctionEligibleVehicles);
