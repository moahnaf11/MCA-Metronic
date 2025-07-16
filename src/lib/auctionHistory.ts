import {
  AuctionRecord,
  BidRecord,
  GateLogEntry,
  InspectionReport,
  MaintenanceRecord,
  StorageStatus,
  TitleInfo,
  TowingRecord,
  VehicleSchedule,
} from './vehicles';

const getRandomTimestamp = (): string =>
  new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString();

// Helper to generate random past date
const getRandomPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};

// Generate random auction history
// const generateAuctionHistory = (): AuctionRecord[] => {
//   const historyLength = Math.floor(Math.random() * 5) + 1; // 1 to 5 records
//   return Array.from({ length: historyLength }, (_, index) => {
//     const sold = Math.random() > 0.5;
//     const highestBid = Math.floor(Math.random() * 20000) + 5000;

//     return {
//       auctionId: 1000 + Math.floor(Math.random() * 100),
//       date: getRandomPastDate(7 * (index + 1)), // Weekly spacing
//       highestBid,
//       sold,
//       soldPrice: sold
//         ? highestBid + Math.floor(Math.random() * 1000)
//         : undefined,
//       buyerId: sold
//         ? (Math.floor(Math.random() * 1000000) + 2000000).toString()
//         : undefined,
//     };
//   });
// };

const generateAuctionHistory = (): AuctionRecord[] => {
  const historyLength = Math.floor(Math.random() * 5) + 1; // 1 to 5 records
  const baseAuctionId = 1000 + Math.floor(Math.random() * 100); // base auction ID
  const now = new Date();

  const records: AuctionRecord[] = [];

  for (let i = 0; i < historyLength; i++) {
    const highestBid = Math.floor(Math.random() * 20000) + 5000;

    const date = new Date(now);
    date.setDate(now.getDate() - 7 * i); // weekly spacing backwards

    if (i === 0) {
      // most recent, mark as sold
      records.push({
        auctionId: baseAuctionId + i,
        date: date.toISOString().split('T')[0], // YYYY-MM-DD
        highestBid,
        sold: true,
        soldPrice: highestBid + Math.floor(Math.random() * 1000),
        buyerId: (Math.floor(Math.random() * 1000000) + 2000000).toString(),
      });
    } else {
      // rest unsold
      records.push({
        auctionId: baseAuctionId + i,
        date: date.toISOString().split('T')[0],
        highestBid,
        sold: false,
      });
    }
  }

  return records;
};

const generateTowingHistory = (): TowingRecord[] => {
  const count = Math.floor(Math.random() * 3) + 1;
  const locations = [
    'Yard A',
    'Yard B',
    'Main Auction Lot',
    'Service Center',
    'Warehouse',
  ];
  const drivers = [
    'Ali Khan',
    'John Doe',
    'Sarah Lee',
    'Mohammed Saeed',
    'Tom Jackson',
  ];

  return Array.from({ length: count }, () => ({
    date: getRandomPastDate(Math.floor(Math.random() * 30)),
    from: locations[Math.floor(Math.random() * locations.length)],
    to: locations[Math.floor(Math.random() * locations.length)],
    driver: drivers[Math.floor(Math.random() * drivers.length)],
    truckId: 'TRK-' + Math.floor(Math.random() * 1000),
    status: ['completed', 'pending', 'cancelled'][
      Math.floor(Math.random() * 3)
    ] as TowingRecord['status'],
  }));
};

const generateInspectionReport = (): InspectionReport[] => [
  {
    inspectedOn: getRandomPastDate(10),
    inspector: 'Mohammed Al Faisal',
    bodyCondition: ['excellent', 'good', 'fair', 'damaged'][
      Math.floor(Math.random() * 4)
    ] as InspectionReport['bodyCondition'],
    mechanicalCondition: ['running', 'non-running', 'requires maintenance'][
      Math.floor(Math.random() * 3)
    ] as InspectionReport['mechanicalCondition'],
    notes: 'Minor scratches on rear bumper',
  },
];

const generateTitleInfo = (): TitleInfo => ({
  state: 'Texas',
  status: ['clean', 'salvage', 'rebuilt', 'parts only'][
    Math.floor(Math.random() * 4)
  ] as TitleInfo['status'],
  documentType: ['title', 'registration', 'certificate of destruction'][
    Math.floor(Math.random() * 3)
  ] as TitleInfo['documentType'],
  receivedDate: getRandomPastDate(20),
});

const generateMaintenanceRecords = (): MaintenanceRecord[] =>
  Array.from({ length: 2 }, () => ({
    date: getRandomPastDate(Math.floor(Math.random() * 100)),
    description: ['Oil change', 'Brake pads replaced', 'Engine tune-up'][
      Math.floor(Math.random() * 3)
    ],
    cost: parseFloat((Math.random() * 500).toFixed(2)),
    performedBy: 'AutoFix Garage',
  }));

const generateBidHistory = (): BidRecord[] =>
  Array.from({ length: 5 }, () => ({
    bidderId: (Math.floor(Math.random() * 1000000) + 1000000).toString(),
    paddleNumber: `${Math.floor(Math.random() * 900) + 100}`,
    bidAmount: Math.floor(Math.random() * 20000) + 5000,
    timestamp: getRandomTimestamp(),
  }));

const generateGateLog = (): GateLogEntry[] =>
  Array.from({ length: 3 }, (_, i) => ({
    event: ['checked-in', 'checked-out', 'gate-pass-issued'][
      i
    ] as GateLogEntry['event'],
    user: ['Admin', 'Guard1', 'Supervisor'][Math.floor(Math.random() * 3)],
    timestamp: getRandomTimestamp(),
    notes: i === 0 ? 'Received by yard manager' : undefined,
  }));

const generateStorage = (): StorageStatus => ({
  location: 'Yard A',
  slot: `A-${Math.floor(Math.random() * 100)}`,
  dateIn: getRandomPastDate(15),
  status: ['active', 'released'][
    Math.floor(Math.random() * 2)
  ] as StorageStatus['status'],
  dateOut: Math.random() > 0.5 ? getRandomPastDate(3) : undefined,
});

const generateSchedule = (): VehicleSchedule => ({
  inspectionDate: getRandomPastDate(12),
  auctionDate: getRandomPastDate(5),
  towingDate: Math.random() > 0.5 ? getRandomPastDate(4) : undefined,
  deliveryDate: Math.random() > 0.5 ? getRandomPastDate(2) : undefined,
});

export {
  generateAuctionHistory,
  generateTowingHistory,
  generateBidHistory,
  generateInspectionReport,
  generateMaintenanceRecords,
  generateGateLog,
  generateSchedule,
  generateStorage,
  generateTitleInfo,
};
