/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  textInput: {
    minHeight: '36px',
  },
  title: {
    marginLeft: '10px',
  },
  paper: {
    height: '240px',
    margin: '0 43px 22px 43px',
    backgroundColor: '#F5F7FC',
  },
  selectUpper: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #00AF5B',
    fontWeight: '700',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  selectLower: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #FA383E',
    fontWeight: '700',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  limitRange: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  limitRangeInputs: {
    margin: '26px 26px 20px 0',
  },
  limitRangeSelect: {
    margin: '0 20px 20px 26px',
  },
  red: {
    border: '1px solid #FA383E',
    borderRadius: '4px',
  },
  green: {
    border: '1px solid #00AF5B',
    borderRadius: '4px',
  },
}));

const LimitRange = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <Grid container>
          <Grid className={classes.limitRange} item xs={12} sm={12}>
            <Text weight="bold" variant="h6">
              Limits Range
            </Text>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <FormField
              className={classes.limitRangeSelect}
              label="Upper Target">
              <Select
                className={classes.selectUpper}
                disableUnderline
                name="upperTarget">
                <MenuItem value={true}>NEQ</MenuItem>
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <FormField className={classes.limitRangeInputs}>
              <TextInput
                type="number"
                placeholder="Number"
                className={`${classes.textInput} ${classes.green}`}
                name="upperLimit"
              />
            </FormField>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <FormField
              className={classes.limitRangeSelect}
              label="Lower Target">
              <Select
                className={classes.selectLower}
                disableUnderline
                name="lowerTarget">
                <MenuItem value={true}>NEQ</MenuItem>
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <FormField className={classes.limitRangeInputs}>
              <TextInput
                type="number"
                placeholder="Number"
                className={`${classes.textInput} ${classes.red}`}
                name="lowerLimit"
              />
            </FormField>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LimitRange;
