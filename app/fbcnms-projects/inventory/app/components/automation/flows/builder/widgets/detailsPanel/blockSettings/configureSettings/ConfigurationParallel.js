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
import Switch from '../../inputs/Switch';
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

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationParallel = ({block}: Props) => {
  const {settings} = block;
  const [parallelSettingsValues, handleInputChange] = useForm({
    conditioned: settings?.conditioned || false,
    condition: settings?.condition || '',
  });

  const {conditioned, condition} = parallelSettingsValues;
  const classes = useStyles();

  useEffect(() => {
    block.setSettings(parallelSettingsValues);
  }, [parallelSettingsValues]);

  return (
    <>
      <Grid item xs={12} className={classes.grid}>
        <Switch
          label={'Conditioned'}
          name={'conditioned'}
          value={conditioned}
          handleInputChange={handleInputChange}
        />
      </Grid>
      {conditioned && (
        <Grid item xs={12} className={classes.gridCodeEditor}>
          <CodeEditor
            mode="json"
            title={'Condition'}
            value={condition}
            name={'condition'}
            onChange={handleInputChange}
          />
        </Grid>
      )}
    </>
  );
};

export default ConfigurationParallel;
