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
import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import {BLUE, DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

import classNames from 'classnames';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  container: {
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  counterVendorName: {
    fontWeight: 'bold',
    paddingLeft: '1rem',
  },
  familyName: {
    marginLeft: '-16px',
    paddingBottom: '12px',
  },
  detailsRoot: {
    marginLeft: '11px',
  },
  networkManagerSystem: {
    color: BLUE.B600,
    fontWeight: 'bold',
    paddingLeft: '0.5rem',
  },
  action: {
    flexGrow: '1',
  },
  deleteIcon: {
    color: DARK.D300,
  },
}));

type Props = $ReadOnly<{|
  externalID: string,
  name: string,
  networkManagerSystem: string,
  counterFamily: {
    name: string,
  },
  vendorFk: {
    name: string,
  },
  edit: MouseEventHandler,
  handleRemove: void => void,
|}>;

export default function CounterTypeItem(props: Props) {
  const {
    externalID,
    name,
    networkManagerSystem,
    counterFamily,
    vendorFk,
    edit,
    handleRemove,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          container
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid xs={3} container justify="flex-start" alignItems="center">
            <Text className={classes.counterVendorName}>{name}</Text>
          </Grid>

          <Grid xs={4} container alignItems="center">
            <Text className={classes.networkManagerSystem}>
              {networkManagerSystem}
            </Text>
          </Grid>

          <Grid xs={3} container justify="flex-start" alignItems="center">
            <Text className={classes.counterVendorName}>{vendorFk.name}</Text>
          </Grid>

          <Grid
            xs={2}
            container
            justifyContent="space-evenly"
            alignItems="center">
            <DeleteOutlinedIcon
              className={classNames(classes.action, classes.deleteIcon)}
              onClick={handleRemove}
            />
            <IconButton
              className={classes.action}
              icon={EditIcon}
              onClick={edit}
            />
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid xs={4}>
              <strong>Counter ID: </strong>
              {externalID}
            </Grid>
            <Grid xs={8} className={classes.familyName}>
              <strong>Family Name: </strong>
              {counterFamily.name}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
