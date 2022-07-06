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
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
}));

type Props = $ReadOnly<{||}>;

const Details = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return <div className={classes.root}>DETAILS</div>;
};

export {Details};
