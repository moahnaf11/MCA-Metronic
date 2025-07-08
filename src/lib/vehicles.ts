interface Vehicle {
  id: number;
  run: number;
  lin: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  color: string;
  company: string;
  buyNow: boolean;
  preBid: boolean;
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
}

// Reusable Icon components for clarity and reusability

// Reusable Button Component
type PaymentStatus = 'paid' | 'partial' | 'unpaid';

const vehicles: Vehicle[] = [
  {
    id: 1,
    run: 123,
    lin: 71179,
    vin: 'SN1AT2MT3EC795462',
    year: 2014,
    make: 'NISSAN',
    model: 'ROGUE',
    color: 'WHITE',
    company: 'MARHABA AUCTIONS LLC',
    buyNow: false,
    preBid: false,
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
  },

  ...Array.from({ length: 50 }, (_, i) => {
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
      run: Math.floor(Math.random() * 200) + 1,
      lin: Math.floor(Math.random() * 80000) + 60000,
      invoiceNumber,
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
      preBid: Math.random() > 0.7,
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
export type { Vehicle, PaymentStatus };
