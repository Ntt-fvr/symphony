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

import CounterTypeItem from './CounterTypeItem'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: 'inherit',
  },
  cont: {
    padding: '20px',
    width: '1200px',
    height:'18px'    
  },
 
}));



const EquipmentTypes = () => {  
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.cont}>
        <CounterTypeItem />
      </Grid>
    </div>
  );
};

export default EquipmentTypes;
