/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {WithStyles} from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ConfigureAccordion from './ConfigureAccordionPanelCounter';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

import type {ContextRouter} from 'react-router-dom';

import withInventoryErrorBoundary from '../../common/withInventoryErrorBoundary';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
  detailsRoot: {
    display: 'block',
    
  },
  container: {
    width:'916px',
    marginBottom: '7px',
    marginTop:'7px',
    align:'center',
  },
  detailsContainer: {
    display: 'flex',
    width: '100%',
    height: 'auto',
  },
  sectionId: {
    width:'42%',
    marginLeft:'3px',
    
  },
  sectionFm: {
    width:'50%',
    marginLeft:'35px',
  },
  configure: {
    padding: '5px',
  },
});

type Props = ContextRouter & WithStyles<typeof styles>;

class CounterTypeItem extends React.Component<Props> {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Accordion className={classes.container}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ConfigureAccordion
              className={classes.configure}
              entityName="prueba"
              name="L_E_RAB_SESSIONTIME_HIGHPRECISION_QCI1"
              instanceCount={1}
              icon={<EditOutlinedIcon />}
              instanceNameSingular="Gestor_manager"
              instanceNamePlural="Hortua"
            />
          </AccordionSummary>
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
        </Accordion>
      </div>
    );
  }
}

export default withStyles(styles)(
  withRouter(withInventoryErrorBoundary(CounterTypeItem)),
);
