/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';

// DESING SYSTEM //
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import DynamicPropertyTypes from './common/DynamicPropertyTypes';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ServicesTypeCardDetails from './ServicesTypeCardDetails';
import ServicesTypes from './ServicesTypes';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    margin: '30px',
    '&. MuiAccordionSummary-content': {
      margin: '4px 0',
    },
  },
  header: {
    marginBottom: '1.5rem',
  },
  card: {
    marginBottom: '7px',
  },
  ServiceIdDescription: {
    display: 'flex',
    alignItems: 'center',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  AccordionDetails: {
    margin: '0 70px',
  },
  iconContainer: {
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.D500,
    width: '48px',
    height: '48px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...symphony.typography.h5,
  },
}));

type Props = $ReadOnly<{|
  handlerData: any,
|}>;

const ServicesRelatedCardDetailsInner = (props: Props) => {
  const {handlerData} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [returnServiceTypes, setReturnServiceTypes] = useState(false);
  const [returnServiceAndRelated, setReturnServiceAndRelated] = useState(false);
  const history = useHistory();

  const showServicesTypes = () => {
    setReturnServiceTypes(true);
  };
  if (returnServiceTypes) {
    return <ServicesTypes />;
  }
  const showServicesAndRelated = () => {
    history.push(
      `/fulfillment/fulfillmentCatalog/services?idService=${handlerData.item.Id}`,
    );
    setReturnServiceAndRelated(true);
  };
  if (returnServiceAndRelated) {
    return <ServicesTypeCardDetails handlerData={handlerData} />;
  }
  return (
    <div className={classes.root}>
      <Grid className={classes.header}>
        <Breadcrumbs
          breadcrumbs={[
            {
              id: 'Services',
              name: 'Services',
              onClick: () => showServicesTypes(),
            },
            {
              id: handlerData.item.Id,
              name: `${handlerData.item.Type} ID ${handlerData.item.Id}`,
              onClick: () => showServicesAndRelated(),
            },
            true && {
              id: 'RFS_ID_57',
              name: `RFS ID 57`,
            },
          ]}
          size="large"
        />
        <Text variant={'subtitle2'}>
          {fbt(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            '',
          )}
        </Text>
      </Grid>
      <Accordion
        className={classes.card}
        container
        alignItems="center"
        expanded={open}>
        <AccordionSummary
          container
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container>
            <Grid sm={4}>
              <div className={classes.inline}>
                <div className={classes.iconContainer}>
                  <LinearScaleIcon />
                </div>
                <Text variant="h6" weight="bold">
                  RFS
                </Text>
              </div>
            </Grid>

            <Grid sm={4} className={classes.ServiceIdDescription}>
              <DynamicPropertyTypes name="Service ID" txt="57" />
            </Grid>
            <Grid sm={4} className={classes.ServiceIdDescription}>
              <DynamicPropertyTypes name="Description" txt="RFS Last Mile" />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.AccordionDetails}>
          <Grid container spacing={0}>
            <Grid xs={6}>
              <DynamicPropertyTypes name="Description" txt={'RFS Last Mile'} />
              <DynamicPropertyTypes name="HasStarted" txt={'False'} />
              <DynamicPropertyTypes name="IsBundle" txt={'False'} />
              <DynamicPropertyTypes name="IsServiceEnabled" txt={'False'} />
              <DynamicPropertyTypes name="IsStateful" txt={'Planed'} />
            </Grid>
            <Grid xs={6}>
              <DynamicPropertyTypes name="Name" txt={'RFS_LM_001'} />
              <DynamicPropertyTypes name="ServiceState" txt={'Planned'} />
              <DynamicPropertyTypes name="ServiceType" txt={'BSA'} />
              <DynamicPropertyTypes name="State" txt={'Planned'} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ServicesRelatedCardDetailsInner;
