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
import Select from '../../../../../../inputs/Select';
import Switch from '../../../../../../inputs/Switch';
import TextField from '../../../../../../inputs/TextField';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';

const FIXED_INTERVAL = 'fixed_interval';

const ConfigurationTimer = () => {
  const behaviors = [
    {name: 'Fixed Interval', id: 'fixed_interval'},
    {name: 'Specific date and time', id: 'date_time'},
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
    dateTimerExpression: '',
    pointingFixedInterval: '',
    pointingDateTime: '',
  });

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
      <Grid item xs={12}>
        <Select
          label={'Behavior'}
          name={'behavior'}
          value={behavior}
          onChange={handleInputChange}
          items={behaviors}
        />
      </Grid>
      <Grid item xs={12}>
        <Switch
          label={'Expression Language'}
          name={'expressionLanguage'}
          value={expressionLanguage}
          handleInputChange={handleInputChange}
        />
      </Grid>
      {expressionLanguage ? (
        behavior === FIXED_INTERVAL ? (
          <>
            <Grid item xs={12}>
              <TextField
                label={'Seconds'}
                type={'number'}
                name={'secondsNumber'}
                value={secondsNumber}
                handleInputChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              {secondsExpression} 'expression component FIXED'
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            {dateTimerExpression} 'expression component DATE'
          </Grid>
        )
      ) : (
        ''
      )}
      <Grid item xs={12}>
        <Switch
          label={'Link to change timer signal'}
          name={'timerSignal'}
          value={timerSignal}
          handleInputChange={handleInputChange}
        />
      </Grid>
      {timerSignal ? (
        behavior === FIXED_INTERVAL ? (
          <Grid item xs={12}>
            {pointingFixedInterval} 'pointingFixedInterval '
          </Grid>
        ) : (
          <Grid item xs={12}>
            {pointingDateTime} 'pointingDateTime expression'
          </Grid>
        )
      ) : (
        ''
      )}
    </>
  );
};

export default ConfigurationTimer;
