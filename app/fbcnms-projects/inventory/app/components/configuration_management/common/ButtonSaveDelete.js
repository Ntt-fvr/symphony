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
  addCounter: {
    width: '98px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  buttonText: {
    maxHeight: '100%',
    display: 'flex',
  },
}));

export type MouseEventHandler = (
  SyntheticMouseEvent<HTMLElement>,
) => void | Promise<void>;

export type ButtonVariant = 'contained' | 'outlined';

export type ButtonColor = 'default' | 'inherit' | 'primary' | 'secondary';

export type Props = $ReadOnly<{|
  className?: string,
  children: string,
  onClick?: ?MouseEventHandler,
  disabled?: boolean,
  color?: ButtonColor,
  variant?: ButtonVariant,
|}>;

const ButtonSaveDelete = (props: Props) => {
  const {
    className,
    disabled,
    onClick,
    color = 'primary',
    children,
    variant = 'contained',
  } = props;
  const classes = useStyles();

  return (
    <Button
      className={classNames(classes.addCounter, className)}
      color={color}
      disabled={disabled}
      variant={variant}
      onClick={onClick}>
      {children}
    </Button>
  );
};
export default ButtonSaveDelete;
