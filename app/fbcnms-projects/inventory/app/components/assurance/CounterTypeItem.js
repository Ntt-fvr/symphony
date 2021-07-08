/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';

// DESING SYSTEM //
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
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  bold: {
    fontWeight: 'bold',
  },
  details: {
    marginLeft: '-16px',
  },
  detailsRoot: {
    marginLeft: '11px',
  },
  blue: {
    color: '#3984FF',
    fontWeight: 'bold',
  },
  editIcon: {
    flexGrow: '1',
    margin: '10px',
  },
  deleteIcon: {
    flexGrow: '1',
    margin: '10px',
    color: DARK.D300,
  },
  button: {
    marginLeft: '20%',
  },
}));

type Props = $ReadOnly<{|
  counter: Object,
  edit: void,
  onChange: void,
|}>;

export default function CounterTypeItem(props: Props) {
  const {counter, edit, onChange} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          container
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid xs={4} container justify="flex-start" alignItems="center">
            <Text className={classes.bold}>{counter.name}</Text>
          </Grid>

          <Grid xs={2} container alignItems="center">
            <Text className={classes.blue}>{counter.networkManagerSystem}</Text>
          </Grid>

          <Grid xs={5} container justify="center" alignItems="center">
            <Text className={classes.bold}>{'Erikson'}</Text>
          </Grid>

          <Grid xs={1} container justify="flex-end" alignItems="center">
            <IconButton
              onClick={edit}
              className={classes.editIcon}
              icon={EditIcon}
            />
            <DeleteOutlinedIcon
              className={classes.deleteIcon}
              onClick={onChange}
            />
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid xs={4}>
              <strong>Counter ID: </strong>40
            </Grid>
            <Grid xs={8} className={classes.details}>
              <strong>Family Name:</strong>Throughput and Data Volume
              Measurement
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
