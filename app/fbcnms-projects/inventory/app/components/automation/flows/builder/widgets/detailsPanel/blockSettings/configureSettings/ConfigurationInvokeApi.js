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

const ConfigurationInvokeApi = () => {
  const urlMethods = [
    {name: 'GET', id: 'get'},
    {name: 'POST', id: 'post'},
    {name: 'PUT', id: 'put'},
    {name: 'DELETE', id: 'delete'},
  ];

  const [configurationsValues, handleInputChange] = useForm({
    urlMethod: '',
    connectionTimeout: 0,
    urlAddress: '',
    headers: '',
    body: '',
  });

  const {
    urlMethod,
    connectionTimeout,
    urlAddress,
    headers,
    body,
  } = configurationsValues;

  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'URL Method'}
          name={'urlMethod'}
          value={urlMethod}
          onChange={handleInputChange}
          items={urlMethods}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor mode="xml" title={'URL'} />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <TextField
          label={'Connection Timeout'}
          type={'number'}
          name={'connectionTimeout'}
          value={connectionTimeout}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor mode="json" title={'Headers'} />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor mode="json" title={'Body'} />
      </Grid>
    </>
  );
};

export default ConfigurationInvokeApi;
