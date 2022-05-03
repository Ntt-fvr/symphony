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
import Text from '@symphony/design-system/components/Text';
import {BLUE} from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: BLUE.B600,
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    fontSize: '16px',
  },
}));

type Props = $ReadOnly<{|
  children: React.Node,
|}>;

const CircleIndicator = (props: Props) => {
  const {children} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Text className={classes.indicator} variant="caption" color="light">
        {children}
      </Text>
    </div>
  );
};

export {CircleIndicator};
