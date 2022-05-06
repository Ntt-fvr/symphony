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
import BlockNameInput from './BlockNameInput';
import Select from '../../../../../../inputs/Select';
import Switch from '../../../../../../inputs/Switch';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
    },
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationTimer = ({block}: Props) => {
  const behaviors = [
    {name: 'Fixed Interval', id: 'fixed+interval'},
    {name: 'Specific date and time', id: 'date_time'},
  ];
  const classes = useStyles();
  const [configurationsValues, handleInputChange] = useForm({
    behavior: 'fixed+interval',
    expressionLanguage: false,
    timerSignal: false,
    secondsNumber: 0,
    secondsExpression: null,
    dateTimerExpression: null,
    pointtingFixedInterval: null,
    pointtingDateTime: '',
  });

  const {behavior, expressionLanguage} = configurationsValues;
  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <BlockNameInput block={block} />
      </Grid>
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
    </Grid>
  );
};

export default ConfigurationTimer;
