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

const ConfigurationInvokeApi = ({block}: Props) => {
  const {settings} = block;
  const urlMethods = [
    {name: 'GET', id: 'get'},
    {name: 'POST', id: 'post'},
    {name: 'PUT', id: 'put'},
    {name: 'DELETE', id: 'delete'},
  ];

  const [invokeApiSettingsValues, handleInputChange] = useForm({
    urlMethod: settings?.urlMethod || '',
    connectionTimeout: settings?.connectionTimeout || 0,
    urlAddress: settings?.urlAddress || '',
    headers: settings?.headers || '',
    body: settings?.body || '',
  });

  const {
    urlMethod,
    connectionTimeout,
    urlAddress,
    headers,
    body,
  } = invokeApiSettingsValues;

  useEffect(() => {
    block.setSettings(invokeApiSettingsValues);
  }, [invokeApiSettingsValues]);

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
        <CodeEditor
          value={urlAddress}
          name={'urlAddress'}
          onChange={handleInputChange}
          mode="xml"
          title={'URL'}
        />
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
        <CodeEditor
          value={headers}
          name={'headers'}
          onChange={handleInputChange}
          mode="json"
          title={'Headers'}
        />
      </Grid>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="json"
          title={'Body Content'}
          value={body}
          name={'body'}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationInvokeApi;
