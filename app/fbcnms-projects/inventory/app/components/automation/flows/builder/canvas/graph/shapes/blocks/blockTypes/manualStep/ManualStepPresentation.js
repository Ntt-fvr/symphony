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
import classNames from 'classnames';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

type Props = $ReadOnly<{|
  className?: ?string,
|}>;

export default function ManualStepPresentation(props: Props) {
  const {className} = props;
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <fbt desc="">Manual Step</fbt>
    </div>
  );
}
