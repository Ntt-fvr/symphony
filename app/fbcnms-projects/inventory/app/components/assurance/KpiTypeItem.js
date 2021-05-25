/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import AddButton from './AddButton';
import Button from '@symphony/design-system/components/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchLabels from './Switch';

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
  nameKpi: {
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
}));

export default function KpiTypeItem() {
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
            <Text className={classes.nameKpi}>Nombre de KPI/Indicador</Text>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>Tipo de red</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            <AddButton />
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
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Associated threshold:
                  <Button variant="text">
                    <Text className={classes.thr}>DROP_THR</Text>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  Category: Text
                </Grid>
                <Grid item xs={12}>
                  Maturity: : Text
                </Grid>
                <Grid item xs={12}>
                  Unit: : Text
                </Grid>
                <Grid item xs={12}>
                  ID: Text
                </Grid>
                <Grid item xs={12}>
                  Last modification:: Text
                </Grid>
                <Grid item xs={12}>
                  Description: : Chips allow users to enter information, make
                  selections, filter content, or trigger actions. While buttons
                  are expected.
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              CONTAINS 15 FORMULAS
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
