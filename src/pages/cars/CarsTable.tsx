import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';

const initialCars = [
  {
    lotId: 'LOT001',
    makeModel: 'Toyota Land Cruiser',
    year: 2021,
    vin: 'JTMJU01J5M4023456',
    status: 'Available',
    auctionDate: '2025-07-20',
    startingPrice: 'AED 180,000',
  },
  {
    lotId: 'LOT002',
    makeModel: 'Nissan Patrol',
    year: 2020,
    vin: 'JN1TARZ62L0012345',
    status: 'Sold',
    auctionDate: '2025-06-15',
    startingPrice: 'AED 150,000',
  },
  {
    lotId: 'LOT003',
    makeModel: 'Mercedes-Benz G63',
    year: 2022,
    vin: 'WDCYC7HJ5MX345678',
    status: 'Upcoming',
    auctionDate: '2025-08-10',
    startingPrice: 'AED 650,000',
  },
  {
    lotId: 'LOT004',
    makeModel: 'Ford Mustang',
    year: 2019,
    vin: '1FA6P8TH5K5154321',
    status: 'Available',
    auctionDate: '2025-07-25',
    startingPrice: 'AED 120,000',
  },
  {
    lotId: 'LOT005',
    makeModel: 'BMW X5',
    year: 2021,
    vin: '5UXCR6C05M9E56789',
    status: 'Available',
    auctionDate: '2025-07-30',
    startingPrice: 'AED 230,000',
  },
  {
    lotId: 'LOT006',
    makeModel: 'BMW X6',
    year: 2022,
    vin: '5UXCR6C05M9E56789',
    status: 'Available',
    auctionDate: '2025-07-30',
    startingPrice: 'AED 230,000',
  },
  {
    lotId: 'LOT007',
    makeModel: 'BMW X7',
    year: 2023,
    vin: '5UXCR6C05M9E56789',
    status: 'Available',
    auctionDate: '2025-07-30',
    startingPrice: 'AED 230,000',
  },
];

export default function CarsTable() {
  const [cars, setCars] = useState(initialCars);
  const [editingVinId, setEditingVinId] = useState<string | null>(null);
  const [tempVin, setTempVin] = useState('');

  const handleDoubleClick = (lotId: string, vin: string) => {
    setEditingVinId(lotId);
    setTempVin(vin);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempVin(e.target.value);
  };

  const handleVinSave = (lotId: string) => {
    setCars((prev) =>
      prev.map((car) =>
        car.lotId === lotId ? { ...car, vin: tempVin } : car
      )
    );
    setEditingVinId(null);
  };

  const handleVinCancel = () => {
    setEditingVinId(null);
    setTempVin('');
  };

  const handleVinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, lotId: string) => {
    if (e.key === 'Enter') {
      const confirmSave = window.confirm('Do you want to save this VIN?');
      if (confirmSave) {
        handleVinSave(lotId);
      }else{
        handleVinCancel();
      }
    } else if (e.key === 'Escape') {
      handleVinCancel();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Make & Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>VIN Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Auction Date</TableHead>
          <TableHead className="text-right">Starting Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car) => (
          <TableRow key={car.lotId}>
            <TableCell>{car.makeModel}</TableCell>
            <TableCell>{car.year}</TableCell>
            <TableCell
              onDoubleClick={() => handleDoubleClick(car.lotId, car.vin)}
              className="cursor-pointer"
            >
              {editingVinId === car.lotId ? (
                <input
                  value={tempVin}
                  onChange={handleVinChange}
                  onKeyDown={(e) => handleVinKeyDown(e, car.lotId)}
                  autoFocus
                  className="border px-1 py-0.5 text-sm w-full"
                />
              ) : (
                car.vin
              )}
            </TableCell>
            <TableCell>
              <span
                className={`${
                  car.status === 'Available'
                    ? 'text-green-600'
                    : car.status === 'Sold'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {car.status}
              </span>
            </TableCell>
            <TableCell>{car.auctionDate}</TableCell>
            <TableCell className="text-right">{car.startingPrice}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Button type="button" size="sm">
                <Edit />
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
