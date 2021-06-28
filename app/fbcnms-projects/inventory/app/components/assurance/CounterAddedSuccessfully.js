/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import AddButton from './AddButton';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '400px',
    height: '611px',
    padding: theme.spacing(0),
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  content: {
    width: 'auto',
    height: '450px',
  },
  containerIcon: {
    paddingBottom: '2rem',
  },
  icon: {
    fontSize: '60px',
    color: '#00AF5B',
  },
  addButton: {
    paddingTop: '9rem',
  },
}));

const CounterAddedSuccessfully = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Counter</CardHeader>
      <Grid
        container
        className={classes.content}
        direction="column"
        justify="center"
        alignItems="center">
        <Grid className={classes.containerIcon}>
          <CheckCircleOutlineOutlinedIcon className={classes.icon} />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Text className={classes.message} variant="h6">
            Counter added
          </Text>
          <Grid>
            <Text className={classes.message} variant="h6">
              successfully
            </Text>
          </Grid>
        </Grid>
        <Grid className={classes.addButton}>
          <AddButton textButton={'Add new counter'} />
        </Grid>
      </Grid>
    </Card>
  );
};
export default CounterAddedSuccessfully;
