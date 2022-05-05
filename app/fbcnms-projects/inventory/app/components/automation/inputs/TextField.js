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
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-input': {
      height: 13,
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 10px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
  },
}));

const TextFieldCustom = ({
  variant,
  label,
  type,
  name,
  value,
  handleInputChange,
}) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      variant={variant ? variant : 'outlined'}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default TextFieldCustom;
