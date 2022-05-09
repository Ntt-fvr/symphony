/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '36px',
    padding: '0 10px',
    margin: '0 10px',
    alignSelf: 'flex-end',
  },
}));

export type MouseEventHandler = (
  SyntheticMouseEvent<HTMLElement>,
) => void | Promise<void>;

export type Props = $ReadOnly<{|
  className?: string,
  children: React.Node,
  onClick?: ?MouseEventHandler,
  disabled?: boolean,
  variant?: any,
  leftIcon?: any,
|}>;

const ButtonUpload = (props: Props) => {
  const {className, leftIcon, variant, disabled, onClick, children} = props;
  const classes = useStyles();

  return (
    <Button
      className={classNames(classes.root, className)}
      disabled={disabled}
      leftIcon={leftIcon}
      variant={variant}
      onClick={onClick}>
      {children}
    </Button>
  );
};
export default ButtonUpload;
