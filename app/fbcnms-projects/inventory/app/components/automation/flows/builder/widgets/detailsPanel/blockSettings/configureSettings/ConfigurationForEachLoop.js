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

const ConfigurationForEachLoop = ({block}: Props) => {
  const {settings} = block;
  const typeValues = [
    {name: 'Sequential', id: 'sequential'},
    {name: 'Parallel', id: 'parallel'},
  ];

  const classes = useStyles();

  const [forEachLoopSettingsValues, handleInputChange] = useForm({
    types: settings?.types || '',
    itemsArray: settings?.itemsArray || '',
  });

  const {types, itemsArray} = forEachLoopSettingsValues;

  useEffect(() => {
    block.setSettings(forEachLoopSettingsValues);
  }, [forEachLoopSettingsValues]);

  return (
    <>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="json"
          title={'Items Array'}
          value={itemsArray}
          name={'itemsArray'}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Type'}
          name={'types'}
          value={types}
          onChange={handleInputChange}
          items={typeValues}
        />
      </Grid>
    </>
  );
};

export default ConfigurationForEachLoop;
