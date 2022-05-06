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
import Switch from '@symphony/design-system/components/switch/Switch';
import {FormControlLabel, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '16.41px',
      color: '#000000',
    },
  },
}));

type Props = $ReadOnly<{|
  value: boolean,
  name: string,
  label?: string,
  handleInputChange: () => void,
|}>;

const InputSelect = ({value, name, label, handleInputChange}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.formLabel}>
      <FormControlLabel
        value={value}
        control={
          <Switch
            title=""
            checked={value}
            onChange={value => {
              handleInputChange({
                target: {name: name, value},
              });
            }}
          />
        }
        label={
          <Typography variant={'subtitle3'}> {label ? label : ''}</Typography>
        }
        labelPlacement="start"
      />
    </div>
  );
};

export default InputSelect;
