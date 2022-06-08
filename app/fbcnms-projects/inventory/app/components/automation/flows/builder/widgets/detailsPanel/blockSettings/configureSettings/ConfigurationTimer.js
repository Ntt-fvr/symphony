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
import Select from '../../inputs/Select';
import Switch from '../../inputs/Switch';
import TextField from '../../inputs/TextField';
import CodeEditor from '../../inputs/CodeEditor';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';
import {makeStyles} from '@material-ui/core/styles';

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

const ConfigurationTimer = () => {
  const behaviors = [
    {name: 'Fixed Interval', id: 'fixed_interval'},
    {name: 'Specific date and time', id: 'date_time'},
  ];
  const dateTimeValues = [
    {name: 'Date', id: 'date'},
    {name: 'Time and Timezone?', id: 'time_and_timezone'},
  ];
  const [
    configurationsValues,
    handleInputChange,
    handleAllInputChange,
  ] = useForm({
    behavior: 'fixed_interval',
    expressionLanguage: false,
    timerSignal: false,
    secondsNumber: 0,
    secondsExpression: '',
    dateTimerExpression: 'date',
    pointingFixedInterval: '',
    pointingDateTime: '',
  });

  const classes = useStyles();

  const {
    behavior,
    expressionLanguage,
    secondsNumber,
    secondsExpression,
    dateTimerExpression,
    timerSignal,
    pointingFixedInterval,
    pointingDateTime,
  } = configurationsValues;

  useEffect(() => {
    const copy = Object.assign({}, configurationsValues);
    copy['secondsNumber'] = 0;
    copy['secondsExpression'] = '';
    copy['dateTimerExpression'] = '';
    copy['pointingFixedInterval'] = '';
    copy['pointingDateTime'] = '';
    handleAllInputChange(copy);
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
      {behavior && behavior !== FIXED_INTERVAL && (
        <Grid item xs={12} className={classes.grid}>
          <Switch
            label={'Expression Language'}
            name={'expressionLanguage'}
            value={expressionLanguage}
            handleInputChange={handleInputChange}
          />
        </Grid>
      )}

      {behavior &&
        behavior !== FIXED_INTERVAL &&
        (expressionLanguage ? (
          <Grid item xs={12} className={classes.gridCodeEditor}>
            <CodeEditor
              mode="javascript"
              value={''}
              title={'Expression Language'}
            />
          </Grid>
        ) : (
          <Grid item xs={12} className={classes.grid}>
            <TextField
              label={'Seconds'}
              type={'number'}
              name={'secondsNumber'}
              value={secondsNumber}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}

      {behavior === FIXED_INTERVAL && (
        <Grid item xs={12} className={classes.grid}>
          <TextField
            label={'Seconds'}
            type={'number'}
            name={'secondsNumber'}
            value={secondsNumber}
            handleInputChange={handleInputChange}
          />
        </Grid>
      )}
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Date and Time'}
          name={'dateTimerExpression'}
          value={dateTimerExpression}
          onChange={handleInputChange}
          items={dateTimeValues}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="javascript"
          value={''}
          title={'Expression Language'}
        />
      </Grid>

      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Link to change timer signal'}
          name={'timerSignal'}
          value={timerSignal}
          handleInputChange={handleInputChange}
        />
      </Grid>
      {timerSignal ? (
        behavior === FIXED_INTERVAL ? (
          <Grid item xs={12} className={classes.grid}>
            <TextField
              label={'Seconds'}
              type={'number'}
              name={'secondsNumber'}
              value={secondsNumber}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ) : (
          <Grid item xs={12} className={classes.gridCodeEditor}>
            <CodeEditor
              mode="javascript"
              value={''}
              title={'Expression Language'}
            />
          </Grid>
        )
      ) : (
        ''
      )}
    </>
  );
};

export default ConfigurationTimer;
