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
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    margin: '0',
  },
}));

export type MouseEventHandler = (
  SyntheticMouseEvent<HTMLElement>,
) => void | Promise<void>;

export type ButtonVariant = 'contained' | 'outlined';

export type ButtonColor = 'default' | 'inherit' | 'primary' | 'secondary';

export type Props = $ReadOnly<{|
  className?: string,
  onClick?: ?MouseEventHandler,
  disabled?: boolean,
  color?: ButtonColor,
  variant?: ButtonVariant,
|}>;

const ButtonsChangeRequest = (props: Props) => {
  const {
    className,
    disabled,
    onClick,
    color = 'primary',
    variant = 'contained',
  } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Button
        className={classNames(className)}
        onClick={onClick}
        disabled={disabled}
        size="medium"
        variant="outlined"
        color={color}>
        <Text useEllipsis={true} color={'primary'}>
          NF Initial Configuration
        </Text>
      </Button>

      <Button
        onClick={onClick}
        disabled={disabled}
        style={{padding: '10px 16px', margin: '0 0 0 20px'}}
        variant={variant}
        color={color}>
        Create bulk request
      </Button>
    </Grid>
  );
};
export default ButtonsChangeRequest;
