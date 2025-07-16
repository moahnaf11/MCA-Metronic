import { ReactElement } from 'react';
import { Link } from 'react-router';
import { Vehicle } from '@/lib/vehicles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface IAboutTable {
  status: string;
  info: ReactElement | string;
}

interface AboutProps {
  vehicle: Vehicle;
}

type IAboutTables = Array<IAboutTable>;

const About = ({ vehicle }: AboutProps) => {
  const tables: IAboutTables = [
    { status: 'Lot number:', info: vehicle.id.toString() },
    { status: 'VIN:', info: vehicle.vin },
    // {
    //   status: 'Title code:',
    //   info:
    //     vehicle.titleInfo?.documentType?.toUpperCase().replace(/_/g, ' ') ??
    //     'N/A',
    // },
    {
      status: 'Odometer:',
      info: `${vehicle.run.toLocaleString()} km (ACTUAL)`,
    },
    { status: 'Primary damage:', info: vehicle.primaryDamage }, // You can extend Vehicle to include this
    {
      status: 'Estimated retail value:',
      info: `$${vehicle.soldPrice.toLocaleString()}`,
    },
    { status: 'Cylinders:', info: vehicle.cylinders.toString() }, // Extend if needed
    { status: 'Color:', info: vehicle.color },
    { status: 'Engine type:', info: vehicle.engineType }, // Optional - not in vehicle type yet
    { status: 'Transmission:', info: vehicle.transmission },
    { status: 'Drive:', info: vehicle.drive },
    { status: 'Vehicle type:', info: vehicle.vehicleType },
    { status: 'Fuel:', info: vehicle.fuel },
    { status: 'Keys:', info: vehicle.keys.toString() },
    { status: 'Highlights:', info: vehicle.highlights },
  ];

  const renderTable = (table: IAboutTable, index: number) => {
    return (
      <TableRow key={index} className="border-0">
        <TableCell className="text-sm text-secondary-foreground py-2">
          {table.status}
        </TableCell>
        <TableCell className="text-sm text-mono py-2">{table.info}</TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader className="ps-8">
        <CardTitle>Car Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {tables.map((table, index) => {
              return renderTable(table, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { About, type IAboutTable, type IAboutTables };
