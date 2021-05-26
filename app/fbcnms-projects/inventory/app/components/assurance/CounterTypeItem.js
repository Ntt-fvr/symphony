/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ConfigureAccordion from './ConfigureAccordionPanelCounter';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  detailsRoot: {
    display: 'block',
    margin:'20px'
  },
  container: {
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
 
  sectionId: {
    marginLeft: '0px',
  },
  sectionFamily: {
    marginLeft: '0px',
  },
});

export default function CounterTypeItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <ConfigureAccordion
            entityName="prueba"
            name="L_E_RAB_SESSIONTIME_HIGHPRECISION_QCI1"
            instanceCount={1}
            icon={<EditOutlinedIcon />}
            instanceNameSingular="Gestor_manager"
            instanceNamePlural="Hortua"
          />
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid xs='6' className={classes.sectionId}>
              <p>
                Counter ID:<span>40</span>
              </p>
            </Grid>
            <Grid xs='6' className={classes.sectionFamily}>
              <p>
                Family Name:
                <span>Throughput and Data Volume Measurement</span>
              </p>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
