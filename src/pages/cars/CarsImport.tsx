import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import { useIntl } from 'react-intl';
import CarsImportForm from './components/CarsImportForm';

const CarsImport = () => {
    const intl = useIntl();

    return (
      <Fragment>
        <Container>
          <Toolbar>
            <ToolbarHeading
              title={intl.formatMessage({id: 'INVENTORY.CARS.IMPORT_CARS', defaultMessage: 'Import Cars'})}
              description={intl.formatMessage({
                id: 'INVENTORY.CARS.IMPORT_DESCRIPTION',
                defaultMessage: 'Import car details from a CSV file.',
              })}
            />
          </Toolbar>
        </Container>
        <Container>
          <CarsImportForm/>
        </Container>
      </Fragment>
    );
  }

export default CarsImport;
