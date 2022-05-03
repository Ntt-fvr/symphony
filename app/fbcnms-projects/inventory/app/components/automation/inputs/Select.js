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
import {DARK} from '@symphony/design-system/theme/symphony';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputLabel-root': {
      paddingBottom: 3,
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '& .MuiSelect-selectMenu': {
      height: 13,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
  paper: {
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    '& .MuiMenuItem-root': {
      height: 48,
      '&:hover': {
        backgroundColor: DARK.D50,
      },
    },
    '& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
      backgroundColor: '#b8c2d3',
    },
    '& .MuiMenu-list': {
      padding: 0,
    },
  },
}));

const InputSelect = ({value, name, label, onChange, items}) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth className={classes.root}>
      <InputLabel id="inputStrategy">{'Strategy'}</InputLabel>
      <Select
        label={label}
        name={name}
        id={name}
        value={value || ''}
        onChange={onChange}
        MenuProps={{
          classes: {paper: classes.paper},
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}>
        {items &&
          items.length > 0 &&
          items.map(({name, id}) => {
            return (
              <MenuItem key={id} value={id}>
                <Typography variant={'body2'}>{name}</Typography>
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
/*
InputSelect.propTypes = {
  value: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
  label: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.func.isRequired,
};*/
