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
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';


import SwitchLabels from './Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddButton from './AddButton';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    width: '916px',
    heigth: '58px',
    margin: '0',
    padding: '0',
    boxSizing: 'inherit',
    background:'black',

  },
  container: {
    background:'#7cfc00',
    heigth: '30px'
  },
  left:{
    background: 'red',
   
  },
  right: {
    background: 'blue',
    marginLeft:'20px'
  },
  typeRed: {
    margin: 'auto 0',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
});

 function KpiTypeItem() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.container}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<SwitchLabels />}/>
           <p>Nombre de KPI/Indicador</p>
           <a href="#" className={classes.typeRed}>Tipo de red</a>
           <Grid xs='6' className={''}>        
              <AddButton/>
           </Grid>
           <Grid>
              <div className={''}>
                <EditIcon/>
              </div>
           </Grid>
           <Grid>
              <div className={''}>
                <DeleteIcon/>
              </div>
            </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid xs='4' className={classes.left}>        
            <p>Tipo de red</p>  
          </Grid>
          <Grid xs='6' className={classes.right}>        
            <p>Tipo de red</p>
          </Grid>
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default KpiTypeItem