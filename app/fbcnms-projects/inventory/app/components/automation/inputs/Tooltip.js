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
import {Tooltip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    borderRadius: 2,
    backgroundColor: theme.palette.secondary.dark,
    padding: 8,
    fontWeight: 500,
    fontSize: '12.5px',
    lineHeight: '15px',
    letterSpacing: 'normal',
  },
}));

type Props = $ReadOnly<{|
  tooltip: string,
  children: React.Node,
|}>;

const CustomizedTooltips = ({tooltip, children}: Props) => {
  const classes = useStylesBootstrap();

  return (
    <Tooltip
      arrow
      title={tooltip}
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}>
      <div>{children}</div>
    </Tooltip>
  );
};

export default CustomizedTooltips;
