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

// COMPONENTS //
import AddButton from './AddButton';
import SwitchLabels from './Switch';
import Table from './Table';

// DESING SYSTEM //
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  panel: {
    cursor: 'default',
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
  details: {},
  rootGrid: {
    flexGrow: '1',
    alignSelf: 'center',
  },
  nameThreshold: {
    fontWeight: 'bold',
  },
  thr: {
    color: '#3984FF',
    fontWeight: 'bold',
  },
  typeRed: {
    marginLeft: '140px',
    color: '#3984FF',
    fontWeight: 'bold',
  },
  edit: {
    flexGrow: '1',
    margin: '10px',
  },
  delete: {
    flexGrow: '1',
    margin: '10px',
  },
  button: {
    marginLeft: '20%',
  },
  rulesContained: {
    margin: '10px 0',
  },
}));

export default function ThresholdTypeItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          classes={{
            root: classes.panel,
          }}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SwitchLabels />}
          />
          <Grid className={classes.rootGrid}>
            <Text className={classes.nameThreshold}>DROP_THR</Text>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text>1968392781902</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>THROUGHPUT_USER_DL_3G</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            <AddButton textButton={'Add rule'} />
          </Grid>

          <Grid>
            <a href="https://www.w3schools.com">
              <IconButton className={classes.edit} icon={EditIcon} />
            </a>
          </Grid>

          <Grid>
            <IconButton className={classes.delete} icon={DeleteIcon} />
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            justify="center"
            alignItems="center">
            <Grid xs={10}>
              Description: : Chips allow users to enter information, make
              selections, filter content, or trigger actions. While buttons are
              expected.
            </Grid>
            <Grid xs={10}>
              <Text
                className={classes.rulesContained}
                weight="bold"
                variant="subtitle1">
                {'Rules contained'}
              </Text>
              <Table />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
