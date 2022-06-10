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
import TextField from '../../inputs/TextField';
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

const ConfigurationTriggeredStart = () => {
  const [configurationsValues, handleInputChange] = useForm({
    signalModule: '',
    blockUntilReception: false,
    signalType: '',
  });

  const {signalModule, signalType} = configurationsValues;
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
        <CodeEditor mode="javascript" title={'Custom Filter'} />
      </Grid>
    </>
  );
};

export default ConfigurationTriggeredStart;
