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
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import Button from '@symphony/design-system/components/Button';
import IconButton from '@symphony/design-system/components/IconButton';
import {AddIcon} from '@symphony/design-system/icons';


import SwitchLabels from './Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddButton from './AddButton';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




const useStyles = makeStyles({
  
  root: {
    width: '79%',
  },
  container:{
    borderRadius:'10px'
  },
  rootGrid:{
    flexGrow:'1',
    alignSelf:'center',
  },
  nameKpi:{
    fontWeight:'bold' ,

  },
  typeRed:{
    color:'#3984FF',
    fontWeight:'bold' ,
    marginLeft:'100px'
  },
  edit:{
    flexGrow:'1',
    margin:'10px'
  },
  delete:{
    flexGrow:'1',
    margin:'10px'
  },
  button:{
    marginLeft:'25%',
  },
});

 function KpiTypeItem() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.container}>
       <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          control={<ExpandMoreIcon />}
          aria-label="Expand"
          >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<SwitchLabels />}
          />
          <Grid  className={classes.rootGrid}>          
            <Text className={classes.nameKpi}>
              Nombre de KPI/Indicador
            </Text>            
          </Grid>

          <Grid className={classes.rootGrid} >
            <Button variant="text"> 
              <Text className={classes.typeRed} >
                Tipo de red
              </Text>  
            </Button>          
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button className={classes.button} leftIcon={AddIcon}>
              Add formula
            </Button>          
          </Grid>

          <Grid >
            <IconButton className={classes.edit} icon={EditIcon }/>          
          </Grid>

          <Grid >
            <IconButton className={classes.delete} icon={DeleteIcon }/>          
          </Grid>     
          
        </AccordionSummary>
        <AccordionDetails>
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default KpiTypeItem