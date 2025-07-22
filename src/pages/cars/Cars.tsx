import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { useIntl } from 'react-intl';
import { CarStats } from './CarStats';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CarsTable from './CarsTable';
import { Import, Plus, Search } from 'lucide-react';
import { Link } from 'react-router';

const Cars = () => {
  const intl = useIntl();

  return (
    <Fragment>
      <Container className='flex flex-col gap-3 lg:flex-row lg:justify-between'>
        <Toolbar>
          <ToolbarHeading
            title={intl.formatMessage({ id: 'INVENTORY.CARS.CAR_LIST', defaultMessage: 'Car List' })}
            description={intl.formatMessage({
              id: 'INVENTORY.CARS.DESCRIPTION',
              defaultMessage: 'Manage your car inventory with ease. Add, edit, and view car details.',
            })}
          />
        </Toolbar>
        <Link to='/inventory/cars/add' className='flex items-center'>
          <Button type='button'><Plus /> New</Button>
        </Link>
      </Container>
      <Container>
        <div className='flex flex-col gap-4 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full'>
            <CarStats />
          </div>
          <div className='flex flex-col lg:flex-row lg:justify-between w-full'>
            <div className='flex items-center gap-2'>
              <Input type='text' placeholder="search" />
              <Button type='button'><Search /></Button>
            </div>
            <div className='flex gap-2 items-center'>
            <Link to='/inventory/cars/import' className='flex items-center'>
               <Button type='button' variant='mono'>
                 <Import />
               </Button>
            </Link>
            </div>
          </div>
          <div className=' w-full'>
            <CarsTable />
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default Cars;