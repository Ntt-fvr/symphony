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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DynamicPropertyTypes from './common/DynamicPropertyTypes';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ServicesRelatedCardDetails from './ServicesRelatedCardDetails';
import ServicesRelatedCardDetailsInner from './ServicesRelatedCardDetailsInner';
import ServicesTypes from './ServicesTypes';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
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
    padding: '1px 16px',
    '& .MuiAccordionSummary-root': {
      padding: '0',
    },
  },
  containerAcordion: {
    '& .MuiAccordionSummary-content': {
      margin: '11px 0',
    },
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  grilla: {
    margin: 'auto 0',
  },
  buttonsDeleteEdit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  deleteIcon: {
    margin: '0px',
    color: DARK.D300,
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

const ServicesTypeCardDetails = (props: Props) => {
  const {handlerData} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [returnServiceTypes, setReturnServiceTypes] = useState(false);
  const history = useHistory();

  const showServicesRelatedCardDetailsInner = () => {
    history.push(
      `/fulfillment/fulfillmentCatalog/services?idService=${handlerData.item.Id}?relatedService=${handlerData.item.Id}`,
    );
    setShowEditCard(true);
  };
  if (showEditCard) {
    return <ServicesRelatedCardDetailsInner handlerData={handlerData} />;
  }

  const showServicesTypes = () => {
    history.push(`/fulfillment/fulfillmentCatalog/services`);
    setReturnServiceTypes(true);
  };

  if (returnServiceTypes) {
    return <ServicesTypes />;
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
            true && {
              id: handlerData.item.Id,
              name: `${handlerData.item.Type} ID ${handlerData.item.Id}`,
            },
          ]}
          size="large"
        />
        <Text variant="subtitle2">
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
          className={classes.containerAcordion}
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container>
            <Grid sm={4} md={3} className={classes.grilla}>
              <div className={classes.inline}>
                <div className={classes.iconContainer}>
                  <LinearScaleIcon />
                </div>
                <Text useEllipsis={true} variant={'h6'} weight="bold">
                  {handlerData.item.Type}
                </Text>
              </div>
            </Grid>

            <Grid sm={3} md={4} className={classes.grilla}>
              <DynamicPropertyTypes
                name="Service ID"
                txt={handlerData.item.Id}
              />
            </Grid>

            <Grid xs={4} className={classes.grilla}>
              <DynamicPropertyTypes
                name="Description"
                txt={handlerData.item.Description}
              />
            </Grid>

            <Grid xs={1} className={classes.buttonsDeleteEdit}>
              <DeleteOutlinedIcon className={classes.deleteIcon} />
              <IconButton icon={EditIcon} />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={0}>
            <Grid xs={6}>
              <DynamicPropertyTypes
                name="ExternalId"
                txt={handlerData.item.ExternalId}
              />
              <DynamicPropertyTypes
                name="HasStarted"
                txt={String(handlerData.item.HasStarted)}
              />
              <DynamicPropertyTypes
                name="IsBundle"
                txt={String(handlerData.item.IsBundle)}
              />
              <DynamicPropertyTypes
                name="IsServiceEnabled"
                txt={String(handlerData.item.IsServiceEnabled)}
              />
              <DynamicPropertyTypes
                name="IsStateful"
                txt={String(handlerData.item.IsStateful)}
              />
              <DynamicPropertyTypes name="Name" txt={handlerData.item.Name} />
            </Grid>
            <Grid xs={6}>
              <DynamicPropertyTypes
                name="SchemaLocation"
                btn={handlerData.item.SchemaLocation}
              />
              <DynamicPropertyTypes
                name="ServiceDate"
                txt={handlerData.item.ServiceDate}
              />
              <DynamicPropertyTypes
                name="Service State"
                txt={handlerData.item.ServiceState}
              />
              <DynamicPropertyTypes
                name="Service Type"
                txt={handlerData.item.ServiceType}
              />
              <DynamicPropertyTypes name="State" txt={handlerData.item.State} />
              <DynamicPropertyTypes name="Type" txt={handlerData.item.Type} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <ServicesRelatedCardDetails
        handlerData={handlerData}
        viewDetails={() => showServicesRelatedCardDetailsInner()}
      />
    </div>
  );
};
export default ServicesTypeCardDetails;
