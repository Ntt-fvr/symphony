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
import Switch from '../../inputs/Switch';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {messageTypes} from '../helpers';
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

const ConfigurationPublishToKafka = ({block}: Props) => {
  const EXPRESSION = 'EXPRESSION';
  const {settings} = block;
  const control = block.id;
  const [publishToKafkaSettingsValues, handleInputChange] = useForm(
    {
      messageType: settings.messageType || '',
      brokers: settings.brokers || '',
      topic: settings.topic || '',
      message: settings.message || '',
    },
    control,
  );

  const {messageType, brokers, topic, message} = publishToKafkaSettingsValues;

  useEffect(() => {
    block.setSettings(publishToKafkaSettingsValues);
  }, [publishToKafkaSettingsValues]);

  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.gridCodeEditor}>
        <CodeEditor
          mode="json"
          title={'Brokers'}
          value={brokers}
          name={'brokers'}
          onChange={handleInputChange}
          helperText={'The field must be separated by “,”'}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <TextField
          label={'Topic'}
          type={'text'}
          name={'topic'}
          value={topic}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Select
          label={'Message Type'}
          name={'messageType'}
          value={messageType}
          onChange={handleInputChange}
          items={messageTypes}
        />
      </Grid>
      {messageType === EXPRESSION && (
        <Grid item xs={12} className={classes.gridCodeEditor}>
          <CodeEditor
            mode="json"
            title={'Message'}
            value={message}
            name={'message'}
            onChange={handleInputChange}
          />
        </Grid>
      )}
    </>
  );
};

export default ConfigurationPublishToKafka;
