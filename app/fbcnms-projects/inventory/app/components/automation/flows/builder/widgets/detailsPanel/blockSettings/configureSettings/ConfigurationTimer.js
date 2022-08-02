/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlock} from '../../../../canvas/graph/shapes/blocks/BaseBlock';

import * as React from 'react';
import CodeEditor from '../../inputs/CodeEditor';
import FormField from '@symphony/design-system/components/FormField/FormField';
import MomentUtils from '@date-io/moment';
import Select from '../../inputs/Select';
import Switch from '../../inputs/Switch';
import TextField from '../../inputs/TextField';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  grid: {
    marginTop: '-11px',
    marginBottom: '10px',
  },
  gridCodeEditor: {
    marginTop: '-31px',
    marginBottom: '10px',
  },
}));

const FIXED_INTERVAL = 'FIXED_INTERVAL';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationTimer = ({block}: Props) => {
  const {settings} = block;
  const behaviors = [
    {name: 'Fixed Interval', id: 'FIXED_INTERVAL'},
    {name: 'Specific date and time', id: 'SPECIFIC_DATETIME'},
  ];
  const [
    timerSettingsValues,
    handleInputChange,
    handleAllInputChange,
  ] = useForm(
    {
      behavior: settings.behavior || 'FIXED_INTERVAL',
      specificDatetime: settings.specificDatetime || null,
      enableExpressionL: settings.enableExpressionL || false,
      expression: settings.expression || null,
      seconds: settings.seconds || null,
    },
    block.id,
  );

  const classes = useStyles();

  useEffect(() => {
    block.setSettings(timerSettingsValues);
  }, [timerSettingsValues]);

  const changeSpecificDateTime = dateTime => {
    handleInputChange({
      target: {
        name: 'specificDatetime',
        value: dateTime.toISOString(),
      },
    });
  };

  const {
    behavior,
    enableExpressionL,
    seconds,
    specificDatetime,
    expression,
  } = timerSettingsValues;

  useEffect(() => {
    if (
      settings.behavior &&
      timerSettingsValues.behavior &&
      (timerSettingsValues.behavior !== settings.behavior ||
        timerSettingsValues.enableExpressionL !== settings.enableExpressionL)
    ) {
      const copy = Object.assign({}, timerSettingsValues);
      copy['seconds'] = null;
      copy['specificDatetime'] = null;
      copy['expression'] = null;
      handleAllInputChange(copy);
    }
  }, [behavior, enableExpressionL]);

  return (
    <>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Behavior'}
          name={'behavior'}
          value={behavior}
          onChange={handleInputChange}
          items={behaviors}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Expression Language'}
          name={'enableExpressionL'}
          value={enableExpressionL}
          handleInputChange={handleInputChange}
        />
      </Grid>
      {enableExpressionL && (
        <Grid item xs={12} className={classes.gridCodeEditor}>
          <CodeEditor
            mode="javascript"
            value={expression}
            name={'expression'}
            onChange={handleInputChange}
            title={'Expression Language'}
          />
        </Grid>
      )}
      {!enableExpressionL && (
        <>
          {behavior !== FIXED_INTERVAL ? (
            <Grid item xs={12} className={classes.grid}>
              <FormField label="Time slot start">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    variant="inline"
                    inputVariant="outlined"
                    value={specificDatetime}
                    onChange={changeSpecificDateTime}
                    onClose={changeSpecificDateTime}
                  />
                </MuiPickersUtilsProvider>
              </FormField>
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.grid}>
              <TextField
                label={'Seconds'}
                type={'number'}
                name={'seconds'}
                value={seconds}
                handleInputChange={handleInputChange}
              />
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default ConfigurationTimer;
