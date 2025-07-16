import {
  generateAuctionHistory,
  generateBidHistory,
  generateGateLog,
  generateInspectionReport,
  generateMaintenanceRecords,
  generateSchedule,
  generateStorage,
  generateTitleInfo,
  generateTowingHistory,
} from './auctionHistory';

export interface AuctionRecord {
  auctionId: number;
  date: string;
  highestBid: number;
  sold: boolean;
  buyerId?: string;
  soldPrice?: number;
}

export interface TowingRecord {
  date: string;
  from: string;
  to: string;
  driver: string;
  truckId: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface InspectionReport {
  inspectedOn: string;
  inspector: string;
  bodyCondition: 'excellent' | 'good' | 'fair' | 'damaged';
  mechanicalCondition: 'running' | 'non-running' | 'requires maintenance';
  notes?: string;
}

export interface TitleInfo {
  state: string;
  status: 'clean' | 'salvage' | 'rebuilt' | 'parts only';
  documentType: 'title' | 'registration' | 'certificate of destruction';
  receivedDate: string;
}

export interface MaintenanceRecord {
  date: string;
  description: string;
  cost: number;
  performedBy: string;
}

export interface BidRecord {
  bidderId: string;
  paddleNumber: string;
  bidAmount: number;
  timestamp: string;
}

export interface GateLogEntry {
  event: 'checked-in' | 'checked-out' | 'gate-pass-issued';
  user: string;
  timestamp: string;
  notes?: string;
}

export interface StorageStatus {
  location: string;
  slot: string;
  dateIn: string;
  dateOut?: string;
  status: 'active' | 'released';
}

export interface VehicleSchedule {
  inspectionDate?: string;
  auctionDate: string;
  towingDate?: string;
  deliveryDate?: string;
}

// Define literal unions with `as const`
const transmissionOptions = ['AUTOMATIC', 'MANUAL'] as const;
const driveOptions = [
  'All wheel drive',
  'Front wheel drive',
  'Rear wheel drive',
] as const;
const fuelOptions = ['GAS', 'DIESEL', 'ELECTRIC', 'HYBRID'] as const;
const vehicleTypeOptions = [
  'AUTOMOBILE',
  'TRUCK',
  'SUV',
  'MOTORCYCLE',
] as const;
const primaryDamageOptions = [
  'MECHANICAL',
  'FRONT END',
  'REAR END',
  'ROOF',
  'ALL OVER',
] as const;
const highlightsOptions = [
  'Run and Drive',
  'Starts',
  'Enhanced Vehicles',
  'Clean Title',
] as const;

interface Vehicle {
  id: number;
  run: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  color: string;
  company: string;
  buyNow: boolean;
  auction: number;
  date: string;
  paddle: string;
  buyerId: string;
  transId: number;
  customerName: string;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  soldPrice: number;
  soldBy: string;
  owner: string;
  gatePass: string | null;
  receivedPaymentBy: string | null;
  linkedBy: string | undefined;
  invoiceNumber: string;
  gatePassStatus?:
    | 'Gate Pass Created'
    | 'Gate Pass Not Created'
    | 'Left Out'
    | null;
  auctionHistory: AuctionRecord[];
  towingRecord: TowingRecord[];
  inspectionReport?: InspectionReport[];
  titleInfo?: TitleInfo;
  maintenanceRecords?: MaintenanceRecord[];
  bidHistory?: BidRecord[];
  gateLog?: GateLogEntry[];
  storage?: StorageStatus;
  schedule?: VehicleSchedule;

  // new fields
  cylinders: 4 | 6 | 8;
  engineType: string;
  transmission: 'AUTOMATIC' | 'MANUAL';
  drive: 'All wheel drive' | 'Front wheel drive' | 'Rear wheel drive';
  fuel: 'GAS' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  keys: boolean;
  vehicleType: 'AUTOMOBILE' | 'TRUCK' | 'SUV' | 'MOTORCYCLE';
  primaryDamage: 'MECHANICAL' | 'FRONT END' | 'REAR END' | 'ROOF' | 'ALL OVER';
  highlights: 'Run and Drive' | 'Starts' | 'Enhanced Vehicles' | 'Clean Title';
}

// Reusable Icon components for clarity and reusability

// Reusable Button Component
type PaymentStatus = 'paid' | 'partial' | 'unpaid';
export const gatePassStatusOptions = [
  'Gate Pass Created',
  'Gate Pass Not Created',
  'Left Out',
] as const;

type GatePassStatus = (typeof gatePassStatusOptions)[number];

const vehicles: Vehicle[] = [
  {
    id: 1,
    run: 123,
    vin: 'SN1AT2MT3EC795462',
    year: 2014,
    make: 'NISSAN',
    model: 'ROGUE',
    color: 'WHITE',
    company: 'MARHABA AUCTIONS LLC',
    buyNow: false,
    auction: 1030,
    date: '2025-06-22',
    paddle: '550',
    buyerId: '2437213',
    transId: 0,
    customerName: '',
    paymentStatus: 'paid',
    receivedPaymentBy: 'Ahmed Abdullah',
    soldPrice: 15500,
    owner: 'John Doe',
    soldBy: 'Sarah Ahmed',
    linkedBy: '',
    gatePass: 'G-12345',
    invoiceNumber: 'INV-1234567',
    gatePassStatus: 'Gate Pass Created',
    auctionHistory: generateAuctionHistory(),
    towingRecord: generateTowingHistory(),
    inspectionReport: generateInspectionReport(),
    titleInfo: generateTitleInfo(),
    storage: generateStorage(),
    schedule: generateSchedule(),
    bidHistory: generateBidHistory(),
    gateLog: generateGateLog(),
    maintenanceRecords: generateMaintenanceRecords(),
    // new
    cylinders: 8,
    engineType: '4.4L 8',
    transmission: 'AUTOMATIC',
    drive: 'All wheel drive',
    fuel: 'GAS',
    keys: true,
    vehicleType: 'AUTOMOBILE',
    primaryDamage: 'MECHANICAL',
    highlights: 'Run and Drive',
  },

  ...Array.from({ length: 50 }, (_, i) => {
    const auctionHistory = generateAuctionHistory();
    const paymentStatus: PaymentStatus = ['paid', 'partial', 'unpaid'][
      Math.floor(Math.random() * 3)
    ] as PaymentStatus;

    const receivedPaymentBy =
      paymentStatus === 'paid' || paymentStatus === 'partial'
        ? [
            'John Smith',
            'Ahmed Ali',
            'Sarah Johnson',
            'Mohammad Hassan',
            'David Wilson',
          ][Math.floor(Math.random() * 5)]
        : null;
    const gatePassStatus =
      paymentStatus === 'paid'
        ? gatePassStatusOptions[Math.floor(Math.random() * 3)]
        : null;

    const invoiceNumber =
      paymentStatus === 'paid' || paymentStatus === 'partial'
        ? `INV-${Math.floor(Math.random() * 900000 + 100000)}`
        : '';

    const gatePass =
      paymentStatus === 'paid'
        ? `G-${Math.floor(Math.random() * 900000 + 100000)}`
        : '';

    return {
      id: i + 2,
      cylinders: [4, 6, 8][Math.floor(Math.random() * 3)] as 4 | 6 | 8,
      engineType: `${(Math.random() * 4 + 1).toFixed(1)}L ${[4, 6, 8][Math.floor(Math.random() * 3)]}`,
      transmission:
        transmissionOptions[
          Math.floor(Math.random() * transmissionOptions.length)
        ],
      drive: driveOptions[Math.floor(Math.random() * driveOptions.length)],
      fuel: fuelOptions[Math.floor(Math.random() * fuelOptions.length)],
      keys: Math.random() > 0.2,
      vehicleType:
        vehicleTypeOptions[
          Math.floor(Math.random() * vehicleTypeOptions.length)
        ],
      primaryDamage:
        primaryDamageOptions[
          Math.floor(Math.random() * primaryDamageOptions.length)
        ],
      highlights:
        highlightsOptions[Math.floor(Math.random() * highlightsOptions.length)],
      auctionHistory: generateAuctionHistory(),
      towingRecord: generateTowingHistory(),
      inspectionReport: generateInspectionReport(),
      titleInfo: generateTitleInfo(),
      storage: generateStorage(),
      schedule: generateSchedule(),
      bidHistory: auctionHistory.length ? generateBidHistory() : [],
      gateLog: ['paid', 'partial'].includes(paymentStatus)
        ? generateGateLog()
        : [],
      maintenanceRecords:
        paymentStatus !== 'unpaid' ? generateMaintenanceRecords() : [],
      run: Math.floor(Math.random() * 200) + 1,
      invoiceNumber,
      gatePassStatus,
      gatePass,
      vin: `VIN${String(i + 9).padStart(13, '0')}`,
      year: 2010 + Math.floor(Math.random() * 15),
      make: [
        'TOYOTA',
        'HONDA',
        'NISSAN',
        'BMW',
        'MERCEDES BENZ',
        'AUDI',
        'KIA',
        'HYUNDAI',
      ][Math.floor(Math.random() * 8)],
      model: [
        'CAMRY',
        'ACCORD',
        'ALTIMA',
        '328i',
        'C-CLASS',
        'A4',
        'OPTIMA',
        'ELANTRA',
      ][Math.floor(Math.random() * 8)],
      color: ['WHITE', 'BLACK', 'SILVER', 'BLUE', 'RED', 'GRAY'][
        Math.floor(Math.random() * 6)
      ],
      company: 'MARHABA AUCTIONS LLC',
      buyNow: Math.random() > 0.8,
      auction: 1030 - Math.floor(Math.random() * 3),
      date: '2025-06-21',
      paddle:
        Math.random() > 0.5
          ? String(Math.floor(Math.random() * 1000) + 100)
          : `MAHBM${Math.floor(Math.random() * 100000)}`,
      buyerId: (Math.floor(Math.random() * 1000000) + 2000000).toString(),
      transId:
        Math.random() > 0.3 ? Math.floor(Math.random() * 200000) + 100000 : 0,
      customerName: [
        'John Smith',
        'Ahmed Ali',
        'Sarah Johnson',
        'Mohammad Hassan',
        'David Wilson',
      ][Math.floor(Math.random() * 5)],
      paymentStatus,
      receivedPaymentBy,
      soldPrice: Math.floor(Math.random() * 50000) + 10000,
      owner: [
        'Joe Frazier',
        'Ahmed Abdullah',
        'Sarah Ahmed',
        'Mohammad Hassan',
        'David Goggins',
      ][Math.floor(Math.random() * 5)],
      soldBy: [
        'Joe Frazier',
        'Ahmed Abdullah',
        'Sarah Ahmed',
        'Mohammad Hassan',
        'David Goggins',
      ][Math.floor(Math.random() * 5)],
      linkedBy: [
        'Joe Frazier',
        'Ahmed Abdullah',
        'Sarah Ahmed',
        'Mohammad Hassan',
        'David Goggins',
      ][Math.floor(Math.random() * 5)],
    };
  }),
];

const customerOptions = [
  {
    value: 'john-doe',
    label: 'John Doe',
    paddle: '123',
    mobile: '0501234567',
  },
  {
    value: 'jane-smith',
    label: 'Jane Smith',
    paddle: '456',
    mobile: '0509876543',
  },
  {
    value: 'bob-johnson',
    label: 'Bob Johnson',
    paddle: '789',
    mobile: '0502468135',
  },
  {
    value: 'alice-brown',
    label: 'Alice Brown',
    paddle: '321',
    mobile: '0501122334',
  },
  {
    value: 'charlie-wilson',
    label: 'Charlie Wilson',
    paddle: '654',
    mobile: '0509988776',
  },
];

export { vehicles, customerOptions };
export type { Vehicle, PaymentStatus, GatePassStatus };
