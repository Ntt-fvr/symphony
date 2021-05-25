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
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';


import KpiTypeItem from './KpiTypeItem'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    boxSizing: 'inherit',
  },
  cont: {
    padding: '20px',
    width: '1200px',
    height: '18px',
  },

})
const KpiTypes = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.cont}>
        <h1>Kpi catalog</h1>
        <KpiTypeItem />
                <KpiTypeItem />
        <KpiTypeItem />
        <KpiTypeItem />
        <KpiTypeItem />

      </Grid>
    </div>
  );
};

export default KpiTypes;
