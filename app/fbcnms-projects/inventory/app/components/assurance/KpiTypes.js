/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Grid from '@material-ui/core/Grid';
import React from 'react';
import {makeStyles} from '@material-ui/styles';

import AddFormulaItemForm from './AddFormulaItemForm';
import AddKpiItemForm from './AddKpiItemForm';
import KpiTypeItem from './KpiTypeItem';
import Text from '@symphony/design-system/components/Text';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const KpiTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Text variant="h5">Kpi Container</Text>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
          <KpiTypeItem />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddKpiItemForm />
          <AddFormulaItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default KpiTypes;
