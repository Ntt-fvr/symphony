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
import Select from '@symphony/design-system/components/Select/Select';

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
  onClickBulk?: ?MouseEventHandler,
  onClickNf?: ?MouseEventHandler,
  disabled?: boolean,
  color?: ButtonColor,
  variant?: ButtonVariant,
|}>;

const ButtonsChangeRequest = (props: Props) => {
  const {
    className,
    disabled,
    onClickBulk,
    onClickNf,
    color = 'primary',
    variant = 'contained',
  } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Select
        options={[]}
        // selectedValue={workOrder.priority}
        // onChange={value => _setWorkOrderDetail('priority', value)}
      />

      <Button
        onClick={onClickBulk}
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
