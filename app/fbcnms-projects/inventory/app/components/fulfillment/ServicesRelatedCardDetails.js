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

import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DynamicPropertyTypes from './common/DynamicPropertyTypes';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ServicesRelatedCardItemType from './ServicesRelatedCardItemType';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    '&. MuiAccordionSummary-content': {
      margin: '4px 0',
    },
  },
  card: {
    marginBottom: '7px',
    '& .MuiAccordionDetails-root': {
      padding: '8px 12px 16px 16px',
    },
  },
  containerGrid2: {
    margin: 'auto 0',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
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
  viewDetails?: MouseEventHandler,
|}>;
const ServicesRelatedCardDetails = (props: Props) => {
  const {viewDetails, handlerData} = props;
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
            <Grid xs={4} md={3}>
              <div className={classes.inline}>
                <div className={classes.iconContainer}>
                  <LinearScaleIcon />
                </div>
                <Text useEllipsis={true} variant="h6" weight="bold">
                  Related services
                </Text>
              </div>
            </Grid>

            <Grid xs={8} md={9} className={classes.containerGrid2}>
              <DynamicPropertyTypes
                name={handlerData.item.AssociatedServices}
                txt="2"
              />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={0}>
            <Grid xs={12}>
              <ServicesRelatedCardItemType
                handlerData={handlerData}
                viewDetails={viewDetails}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default ServicesRelatedCardDetails;
