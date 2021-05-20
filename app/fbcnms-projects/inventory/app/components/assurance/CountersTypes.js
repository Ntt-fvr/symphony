/*[object Object]*/

// eslint-disable-next-line header/header
import React from 'react';

import {makeStyles} from '@material-ui/styles';

import CounterTypeItem from './CounterTypeItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    boxSizing: 'inherit',
  },
  cont: {
    padding: '20px',
    width: '1200px',
    height: '18px',
  },
}));

const CountersTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.cont}>
        <h1>Counter catalog</h1>
        <CounterTypeItem />
        <CounterTypeItem />
        <CounterTypeItem />
        <CounterTypeItem />
        <CounterTypeItem />
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
    </div>
  );
};

export default CountersTypes;
