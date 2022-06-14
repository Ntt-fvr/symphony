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

const ConfigurationTriggeredStart = ({block}: Props) => {
  const {settings} = block;
  const [triggeredStartSettingsValues, handleInputChange] = useForm({
    signalModule: settings?.signalModule || '',
    signalType: settings?.signalType || '',
    customFilter: settings?.customFilter || '',
  });

  const {signalModule, signalType, customFilter} = triggeredStartSettingsValues;

  useEffect(() => {
    block.setSettings(triggeredStartSettingsValues);
  }, [triggeredStartSettingsValues]);

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
        <TextField
          label={'Signal Type'}
          type={'text'}
          name={'signalType'}
          value={signalType}
          handleInputChange={handleInputChange}
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

export default ConfigurationTriggeredStart;
