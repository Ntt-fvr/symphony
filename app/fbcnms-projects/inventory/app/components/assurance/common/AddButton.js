/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    padding: '0 9px',
    with: '121px',
    height: '32px',
  },
  label: {
    marginLeft: '10px',
    padding: '0px',
    fontSize: '14px',
  },
  icon: {
    paddingLeft: '0px',
    margin: '0px',
  },
}));

type Props = $ReadOnly<{|
  textButton: string,
  onClick?: void => void,
  disabled: boolean,
|}>;

function AddButton(props: Props) {
  const {textButton, onClick, disabled} = props;
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        weight="bold"
        disabled={disabled}
        onClick={onClick}
        className={classes.button}
        startIcon={<AddCircleOutlineIcon className={classes.icon} />}>
        <Text
          className={''}
          color={disabled ? 'gray' : 'primary'}
          variant="subtitle2">
          {textButton}
        </Text>
      </Button>
    </div>
  );
}
export default AddButton;
