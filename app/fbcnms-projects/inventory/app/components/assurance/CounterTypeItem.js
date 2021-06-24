/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
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
  icons: {
    flexGrow: '1',
    margin: '10px',
  },
  button: {
    marginLeft: '20%',
  },
}));

export default function CounterTypeItem({counter, edit, onChange}) {
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
          <Grid xs="4" container justify="flex-start" alignItems="center">
            <Text className={classes.bold}>{counter.name}</Text>
          </Grid>

          <Grid xs="2" container alignItems="center">
            <Text className={classes.blue}>{counter.networkManagerSystem}</Text>
          </Grid>

          <Grid xs="5" container justify="center" alignItems="center">
            <Text className={classes.bold}>{'Erikson'}</Text>
          </Grid>

          <Grid xs="1" container justify="flex-end" alignItems="center">
            <IconButton
              onClick={edit}
              className={classes.icons}
              icon={EditIcon}
            />
            <IconButton
              onClick={onChange}
              className={classes.icons}
              icon={DeleteOutlineIcon}
            />
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid xs="4">
              <p>
                Counter ID:<span>40</span>
              </p>
            </Grid>
            <Grid xs="8" className={classes.details}>
              <p>
                Family Name:<span>Throughput and Data Volume Measurement</span>
              </p>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
