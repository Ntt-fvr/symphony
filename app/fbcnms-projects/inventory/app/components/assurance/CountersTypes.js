/*[object Object]*/

// eslint-disable-next-line header/header
import React from 'react';

import {makeStyles} from '@material-ui/styles';

import AddCounterItemForm from './AddCounterItemForm';
import CounterTypeItem from './CounterTypeItem';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const CountersTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Text variant="h5">Cards Container</Text>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
          <CounterTypeItem />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddCounterItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountersTypes;
