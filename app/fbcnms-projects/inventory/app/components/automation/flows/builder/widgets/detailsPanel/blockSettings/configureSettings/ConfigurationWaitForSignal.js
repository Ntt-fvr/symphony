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
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationWaitForSignal = ({block}: Props) => {
  const {settings} = block;
  const [waitForSignalSettingsValues, handleInputChange] = useForm({
    signalModule: settings?.signalModule || '',
    blockUntilReception: settings?.blockUntilReception || false,
    signalType: settings?.signalType || '',
    customFilter: settings?.customFilter || '',
  });

  const {
    signalModule,
    blockUntilReception,
    signalType,
    customFilter,
  } = waitForSignalSettingsValues;

  const signalTypes = [
    {name: 'WOCreation', id: 'wo_creation'},
    {name: 'InvUpdate', id: 'in_update'},
  ];
  useEffect(() => {
    block.setSettings(waitForSignalSettingsValues);
  }, [waitForSignalSettingsValues]);

  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.grid}>
        <TextField
          label={'Signal Module'}
          type={'text'}
          name={'signalModule'}
          value={signalModule}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Block flow until reception'}
          name={'blockUntilReception'}
          value={blockUntilReception}
          handleInputChange={handleInputChange}
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
    </>
  );
};

export default ConfigurationWaitForSignal;
