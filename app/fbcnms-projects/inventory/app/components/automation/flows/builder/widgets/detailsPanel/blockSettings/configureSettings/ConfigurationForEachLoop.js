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
import CodeEditor from '../../inputs/CodeEditor';
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  grid: {
    marginTop: '-11px',
    marginBottom: '10px',
  },
  gridCodeEditor: {
    marginTop: '-31px',
  },
}));

const ConfigurationForEachLoop = () => {
  const typeValues = [
    {name: 'Sequential', id: 'sequential'},
    {name: 'Parallel', id: 'parallel'},
  ];

  const classes = useStyles();

  const [configurationsValues, handleInputChange] = useForm({
    types: '',
  });

  const {types} = configurationsValues;

  return (
    <>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="javascript"
          title={'Items Array'}
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
