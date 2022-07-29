/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {ConfigurationExecuteFlowQuery} from './__generated__/ConfigurationExecuteFlowQuery.graphql';

import type {IBlock} from '../../../../canvas/graph/shapes/blocks/BaseBlock';

import React, {useMemo, useState} from 'react';
import Select from '../../inputs/Select';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useFlows} from '../../../../../view/AutomationFlowsView';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationExecuteFlow = ({block}: Props) => {
  const {settings} = block;
  const [executeFlowSettingsValues, handleInputChange] = useForm({
    flow: settings?.flow || '',
  }, block.id);

  const {flow} = executeFlowSettingsValues;

  const flows = useFlows();
  const flowsPublished = useMemo(() => {
    const flowsData = flows?.map(p => p.node) || [];
    return flowsData.filter(node => node.status === 'PUBLISHED');
  }, [flows]);

  useEffect(() => {
    block.setSettings(executeFlowSettingsValues);
  }, [executeFlowSettingsValues]);

  return (
    <Grid item xs={12}>
      <Select
        label={'Flow'}
        name={'flow'}
        value={flow}
        onChange={handleInputChange}
        items={flowsPublished}
      />
    </Grid>
  );
};

export default ConfigurationExecuteFlow;
