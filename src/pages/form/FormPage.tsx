import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Container } from '@/components/common/container';
import FormContainer from './FormContainer';
import { useIntl } from 'react-intl';

const FormPage = () => {
    const intl = useIntl();

    return (
      <Fragment>
        <Container>
          <Toolbar>
            <ToolbarHeading
              title={intl.formatMessage({id: 'FORM.TITLE', defaultMessage: 'Form Page'})}
              description={intl.formatMessage({
                id: 'FORM.DESCRIPTION',
                defaultMessage: 'This is a form page example',
              })}
            />
          </Toolbar>
        </Container>
        <Container>
          <FormContainer/>
        </Container>
      </Fragment>
    );
  }

export default FormPage