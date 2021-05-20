/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {EquipmentTypeItem_equipmentType} from './__generated__/EquipmentTypeItem_equipmentType.graphql';
import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithStyles} from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ConfigureAccordion from './ConfigureAccordionPanelCounter';
import DynamicPropertyTypesGrid from '../DynamicPropertyTypesGrid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PortDefinitionsTable from './PortDefinitionsTable';
import PositionDefinitionsTable from './PositionDefinitionsTable';
import React from 'react';
import RemoveEquipmentTypeMutation from '../../mutations/RemoveEquipmentTypeMutation';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import RouterIcon from '@material-ui/icons/Router';
import {ConnectionHandler} from 'relay-runtime';
import {createFragmentContainer, graphql} from 'react-relay';
import {withStyles} from '@material-ui/core/styles';

import withAlert from '@fbcnms/ui/components/Alert/withAlert';

type Props = {|
  equipmentType: EquipmentTypeItem_equipmentType,
  onEdit: () => void,
|} & WithAlert &
  WithStyles<typeof styles>;

const styles = {
  detailsRoot: {
    display: 'block',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent:'space-evenly',
    width: '100%',
  },
  sectionId: {
    marginBottom: '24px',
  },
  sectionFm: {
    marginBottom: '24px',
  },
  configure: {
    padding:'5px'
  }
};

class CounterTypeItem extends React.Component<Props> {
  render() {
    const {classes, equipmentType, onEdit} = this.props;
    return (
      <div>
      <h1>Counter catalog</h1>
        <Accordion >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ConfigureAccordion
              className={classes.configure}            
              entityName="prueba"
              name='L_E_RAB_SESSIONTIME_HIGHPRECISION_QCI1'
              instanceCount={1}
              instanceNameSingular="Gestor_manager"
              icon={<EditOutlinedIcon />}
              instanceNamePlural="Hortua"
              // onDelete={this.onDelete}
              // onEdit={onEdit}
            />  
          </AccordionSummary>
          <AccordionDetails className={classes.detailsRoot}>
            <div className={classes.detailsContainer}>
              <div className={classes.sectionId}>
                <p>Counter ID:<span>40</span> </p>
              </div>
             <div className={classes.sectionFm}>
             <p>Family Name:<span>Throughput and Data Volume Measurement</span></p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion> 
      </div>
    );
  }
}

export default withAlert( withStyles(styles)(CounterTypeItem));

