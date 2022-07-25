/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {FilterProps} from '../comparison_view/ComparisonViewTypes';

import PowerSearchFilter from '../comparison_view/PowerSearchFilter';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {InputAdornment} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Event from '@material-ui/icons/Event';
import React from 'react';
import {makeStyles} from '@material-ui/styles';
import symphony from '@symphony/design-system/theme/symphony';

const useStyles = makeStyles(() => ({
  formField: {
    margin: '0 22px 0px 22px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
    height: '38px',
  },
}));

const PowerSearchAutomationDateFilter = (props: FilterProps) => {
  const {
    value,
    onInputBlurred,
    onValueChanged,
    onRemoveFilter,
    editMode,
  } = props;

  const classes = useStyles();

  return (
    <PowerSearchFilter
      name="Date"
      operator={value.operator}
      editMode={editMode}
      value={value.stringSet}
      onRemoveFilter={onRemoveFilter}
      input={
        <form className={classes.formField} autoComplete="off">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              onSubmit={onInputBlurred}
              onBlur={onInputBlurred}
              value={value.stringSet}
              onChange={newName => {
                onValueChanged({
                  id: value.id,
                  key: value.key,
                  name: value.name,
                  operator: value.operator,
                  stringSet: newName.format('YYYY-MM-DD'),
                });
              }}
              format="yyyy/MM/DD"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Event style={{color: '#8895AD'}} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
        </form>
      }
    />
  );
};

export default PowerSearchAutomationDateFilter;
