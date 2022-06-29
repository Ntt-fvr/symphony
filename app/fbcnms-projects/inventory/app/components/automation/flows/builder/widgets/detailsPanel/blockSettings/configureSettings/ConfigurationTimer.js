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
import Select from '../../inputs/Select';
import Switch from '../../inputs/Switch';
import TextField from '../../inputs/TextField';
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

const FIXED_INTERVAL = 'fixed_interval';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationTimer = ({block}: Props) => {
  const {settings} = block;
  const behaviors = [
    {name: 'Fixed Interval', id: 'fixed_interval'},
    {name: 'Specific date and time', id: 'date_time'},
  ];
  const dateTimeValues = [
    {name: 'Date', id: 'date'},
    {name: 'Time and Timezone?', id: 'time_and_timezone'},
  ];
  const [
    timerSettingsValues,
    handleInputChange,
    handleAllInputChange,
  ] = useForm({
    behavior: settings.behavior || 'fixed_interval',
    datetime: settings.datetime || 'date',
    enableExpressionL: settings.enableExpressionL || false,
    expression: settings.expression || 'null',
    exitPoint: settings.exitPoint || false,
    seconds: settings.seconds || 0,
  });

  const classes = useStyles();

  useEffect(() => {
    block.setSettings(timerSettingsValues);
  }, [timerSettingsValues]);

  const {
    behavior,
    enableExpressionL,
    seconds,
    datetime,
    expression,
    exitPoint,
  } = timerSettingsValues;

  useEffect(() => {
    if (timerSettingsValues.behavior) {
      const copy = Object.assign({}, timerSettingsValues);
      copy['seconds'] = 0;
      copy['datetime'] = 'date';
      copy['expression'] = '';
      copy['seconds'] = '';
      handleAllInputChange(copy);
    }
  }, [behavior]);

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

      {behavior === FIXED_INTERVAL && (
        <>
          <Grid item xs={12} className={classes.grid}>
            <Switch
              label={'Expression Language'}
              name={'enableExpressionL'}
              value={enableExpressionL}
              handleInputChange={handleInputChange}
            />
          </Grid>
          {enableExpressionL ? (
            <Grid item xs={12} className={classes.gridCodeEditor}>
              <CodeEditor
                mode="javascript"
                value={expression}
                name={'expression'}
                onChange={handleInputChange}
                title={'Expression Language'}
              />
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
      {behavior && behavior !== FIXED_INTERVAL && (
        <>
          <Grid item xs={12} className={classes.grid}>
            <Select
              label={'Date and Time'}
              name={'datetime'}
              value={datetime}
              onChange={handleInputChange}
              items={dateTimeValues}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridCodeEditor}>
            <CodeEditor
              mode="javascript"
              value={expression}
              name={'expression'}
              onChange={handleInputChange}
              title={'Expression Language'}
            />
          </Grid>
        </>
      )}

      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Link to change timer signal'}
          name={'exitPoint'}
          value={exitPoint}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationTimer;
