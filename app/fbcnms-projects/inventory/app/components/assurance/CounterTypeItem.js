/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {ContextRouter} from 'react-router-dom';
import type {WithStyles} from '@material-ui/core';

import ConfigureAccordion from './ConfigureAccordionPanelCounter';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import React from 'react';
import {AccordionDetails} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
  },
  detailsRoot: {
    display: 'block',
  },
  container: {
    width: '916px',
    marginBottom: '7px',
    marginTop: '7px',
    align: 'center',
  },
  detailsContainer: {
    display: 'flex',
    width: '100%',
    height: 'auto',
  },
  sectionId: {
    width: '42%',
    marginLeft: '3px',
  },
  sectionFm: {
    width: '50%',
    marginLeft: '35px',
  },
  configure: {
    padding: '5px',
  },
});

type Props = ContextRouter & WithStyles<typeof styles>;

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.container} expanded={open}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <ConfigureAccordion
            className={classes.configure}
            entityName="prueba"
            name="L_E_RAB_SESSIONTIME_HIGHPRECISION_QCI1"
            instanceCount={1}
            icon={<EditOutlinedIcon />}
            instanceNameSingular="Gestor_manager"
            instanceNamePlural="Hortua"
          />
        </ExpansionPanelSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <div className={classes.detailsContainer}>
            <div className={classes.sectionId}>
              <p>
                Counter ID:<span>40</span>
              </p>
            </div>
            <div className={classes.sectionFm}>
              <p>
                Family Name:
                <span>Throughput and Data Volume Measurement</span>
              </p>
            </div>
          </div>
        </AccordionDetails>
      </ExpansionPanel>
    </div>
  );
}
