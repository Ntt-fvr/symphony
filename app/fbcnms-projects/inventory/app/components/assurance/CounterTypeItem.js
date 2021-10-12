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
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  container: {
    '& .MuiAccordionSummary-root': {
      padding: '5px 15px',
    },
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  familyName: {
    marginLeft: '-16px',
    paddingBottom: '12px',
  },
  detailsRoot: {
    marginLeft: '11px',
  },
  deleteIcon: {
    marginRight: '1rem',
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
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container xs={12}>
            <Grid xs={3} container justify="flex-start" alignItems="center">
              <Text useEllipsis={true} weight="bold">
                {name}
              </Text>
            </Grid>

            <Grid xs={4} container alignItems="center">
              <Text useEllipsis={true} color="primary" weight="bold">
                {networkManagerSystem}
              </Text>
            </Grid>

            <Grid
              xs={3}
              sm={3}
              container
              justify="flex-start"
              alignItems="center">
              <Text useEllipsis={true} weight="bold">
                {vendorFk.name}
              </Text>
            </Grid>

            <Grid xs={2} container justify="flex-end" alignItems="center">
              <DeleteOutlinedIcon
                className={classes.deleteIcon}
                onClick={handleRemove}
              />
              <IconButton icon={EditIcon} onClick={edit} />
            </Grid>
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
