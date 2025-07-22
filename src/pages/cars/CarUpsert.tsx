import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { useIntl } from 'react-intl';
import CarsForm from './components/CarsForm';

const CarUpsert = () => {
    const intl = useIntl();

    return (
      <Fragment>
        <Container>
          <Toolbar>
            <ToolbarHeading
              title={intl.formatMessage({id: 'INVENTORY.CARS.ADD_NEW_CAR', defaultMessage: 'Add New Car'})}
              description={intl.formatMessage({
                id: 'INVENTORY.CARS.NEW_DESCRIPTION',
                defaultMessage: 'Add, edit, and view car details.',
              })}
            />
          </Toolbar>
        </Container>
        <Container>
          <CarsForm/>
        </Container>
      </Fragment>
    );
  }

export default CarUpsert