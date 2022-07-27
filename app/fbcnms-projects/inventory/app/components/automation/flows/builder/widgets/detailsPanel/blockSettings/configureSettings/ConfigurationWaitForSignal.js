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
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {signalModules, signalTypes} from '../helpers';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  grid: {
    marginTop: '-11px',
    marginBottom: '10px',
  },
  gridCodeEditor: {
    marginTop: '-31px',
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationWaitForSignal = ({block}: Props) => {
  const {settings} = block;
  const [waitForSignalSettingsValues, handleInputChange] = useForm({
    signalModule: settings?.signalModule || '',
    blocked: settings?.blocked || false,
    signalType: settings?.signalType || '',
    customFilter: settings?.customFilter || '',
  });

  const {
    signalModule,
    blocked,
    signalType,
    customFilter,
  } = waitForSignalSettingsValues;

  useEffect(() => {
    block.setSettings(waitForSignalSettingsValues);
  }, [waitForSignalSettingsValues]);

  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Signal Module'}
          name={'signalModule'}
          value={signalModule}
          onChange={handleInputChange}
          items={signalModules}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Signal Type'}
          name={'signalType'}
          value={signalType}
          onChange={handleInputChange}
          items={signalTypes}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="json"
          title={'Custom Filter'}
          value={customFilter}
          name={'customFilter'}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Block flow until reception'}
          name={'blocked'}
          value={blocked}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationWaitForSignal;
