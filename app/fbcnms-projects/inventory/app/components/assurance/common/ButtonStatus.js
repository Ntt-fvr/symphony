/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  active: {
    background: '#F0FFF8',
    color: '#00AF5B',
    border: '1px solid #00AF5B',
  },
  expired: {
    background: '#FAFCFF',
    color: '#9DA9BE',
    border: '1px solid #9DA9BE',
  },
  buttonText: {
    maxHeight: '100%',
    display: 'flex',
  },
}));

const ButtonStatus = (props: Props) => {
  const {
    className,
    children,
    status
  } = props;
  const classes = useStyles();

  return (
    <Button
      className={status === 'active' ? classNames(classes.active, className) : classNames(classes.expired, className)}
      disableRipple>
      {children}
    </Button>
  );
};
export default ButtonStatus;
