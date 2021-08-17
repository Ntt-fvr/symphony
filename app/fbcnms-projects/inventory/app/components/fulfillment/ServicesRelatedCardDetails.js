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
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import Button from '@symphony/design-system/components/Button';
// import Card from '@symphony/design-system/components/Card/Card';
import DynamicPropertyTypes from './common/DynamicPropertyTypes';
import Grid from '@material-ui/core/Grid';
// import IconButton from '@symphony/design-system/components/IconButton';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import Text from '@symphony/design-system/components/Text';
// import classNames from 'classnames';
import {DARK} from '@symphony/design-system/theme/symphony';
// import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

import ServicesRelatedCardItemType from './ServicesRelatedCardItemType';

import symphony from '@symphony/design-system/theme/symphony';

import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    '&. MuiAccordionSummary-content': {
      margin: '4px 0',
    },
  },
  card: {
    marginBottom: '7px',
  },
  containerGrid2: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2rem',
    border: '1px solid green',
  },
  containerGrid3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    border: '1px solid red',
  },
  insideContainer: {
    padding: '9px 15px',
  },
  view: {
    marginLeft: '1rem',
  },
  editIcon: {
    margin: '0 2rem',
  },
  deleteIcon: {
    margin: '0px',
    color: DARK.D300,
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    border: '1px solid red',
  },
  serviceId: {
    paddingLeft: '4rem',
  },
  associatedService: {
    paddingRight: '4rem',
  },
  iconContainer: {
    borderRadius: '50%',
    marginRight: '1.5rem',
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
  gridEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  gridInner: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
}));

type Props = $ReadOnly<{|
  serviceType?: string,
  serviceTypeRes?: string,
  serviceID?: string,
  serviceIdRes?: string,
  description?: string,
  descriptionRes?: string,
  associatedServices?: string,
  associatedServicesRes?: string,
  viewDetails?: MouseEventHandler,
|}>;

const ServicesRelatedCardDetails = (props: Props) => {
  const {
    // serviceType,
    // serviceID,
    // description,
    // serviceTypeRes,
    // serviceIdRes,
    // descriptionRes,
    viewDetails,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
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
            <Grid xs={4}>
              <div className={classes.inline}>
                <div className={classes.iconContainer}>
                  <LinearScaleIcon />
                </div>
                <Text variant={'h6'} weight={'bold'}>
                  Related services
                </Text>
              </div>
            </Grid>

            <Grid xs={8} className={classes.containerGrid2}>
              <DynamicPropertyTypes name={'RFS'} txt={'2'} />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={''}>
          <Grid container spacing={0}>
            <Grid xs={12}>
              <ServicesRelatedCardItemType viewDetails={viewDetails} />
              <ServicesRelatedCardItemType />
              <ServicesRelatedCardItemType />
              <ServicesRelatedCardItemType />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ServicesRelatedCardDetails;
