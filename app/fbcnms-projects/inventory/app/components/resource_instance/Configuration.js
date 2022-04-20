/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import {TimeLine} from './TimeLine';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    margin: '0',
    padding: '20px 0 0 0 ',
  },
  status: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLineContainer: {
    margin: '20px 0 0 0',
    border: '1px solid blue',
  },
  cardTable: {
    margin: '20px 0 0 0',
  },
}));

type Props = $ReadOnly<{||}>;

const Configuration = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Grid className={classes.status} item xs={12}>
        <Grid item xs={6}>
          <Text>Pending requests: 1</Text>
        </Grid>
        <Grid className={classes.buttonsStatus} item xs={6}>
          <Button size="medium" variant="outlined" color="primary">
            <Text useEllipsis={true} color={'primary'}>
              Sync Parameters
            </Text>
          </Button>
          <Button size="medium" variant="outlined" color="primary">
            <Text useEllipsis={true} color={'primary'}>
              {' '}
              Rollback
            </Text>
          </Button>
          <Button size="medium" variant="outlined" color="primary">
            <Text useEllipsis={true} color={'primary'}>
              Request Change
            </Text>
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.timeLineContainer} item md={12}>
        <TimeLine />
      </Grid>
      <Grid className={classes.cardTable} item xs={12}>
        Tabla Configuration Parameters
      </Grid>
    </Grid>
  );
};

export {Configuration};
