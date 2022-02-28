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

import fbt from 'fbt';

import ConfigureTitle from './common/ConfigureTitle';

import symphony from '@symphony/design-system/theme/symphony';

import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleCounter: {
    margin: '0 0 40px 0',
  },
  listContainer: {
    overflow: 'auto',
    paddingRight: '9px',
    maxHeight: 'calc(95vh - 156px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: symphony.palette.D300,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: symphony.palette.D200,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: symphony.palette.D400,
    },
    '&::-webkit-scrollbar-track': {
      background: symphony.palette.D100,
      borderRadius: '4px',
    },
  },
}));

const ChangeRequestTypes = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleCounter} item xs={12}>
        <ConfigureTitle
          title={fbt('Change Request', '')}
          subtitle={fbt(
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'xxxxx yyyyy zzzzzz',
          )}
        />
      </Grid>
    </Grid>
  );
};

export {ChangeRequestTypes};
