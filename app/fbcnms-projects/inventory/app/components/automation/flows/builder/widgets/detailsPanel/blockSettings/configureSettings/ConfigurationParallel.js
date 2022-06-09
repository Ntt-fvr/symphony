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
import Switch from '../../inputs/Switch';
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
    marginBottom: '10px',
  },
}));

const ConfigurationParallel = () => {
  const [configurationsValues, handleInputChange] = useForm({
    conditioned: false,
  });

  const {conditioned} = configurationsValues;
  const classes = useStyles();

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
            title={'Expression Language'}
          />
        </Grid>
      )}
    </>
  );
};

export default ConfigurationParallel;
