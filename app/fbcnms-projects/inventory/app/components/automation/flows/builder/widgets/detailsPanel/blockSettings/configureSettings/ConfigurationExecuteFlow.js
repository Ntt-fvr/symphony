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

import React, {useMemo} from 'react';
import Select from '../../inputs/Select';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {flowListContext} from ''

type Props = $ReadOnly<{|
  block: IBlock,
|}>;




const flowsQuery = graphql`
  query ConfigurationExecuteFlowQuery {
    flows(first: 500) @connection(key: "AutomationFlowsView_flows") {
      edges {
        node {
          id
          name
          description
          status
          newInstancesPolicy
          draft {
            id
            sameAsFlow
          }
          creationDate
          updateTime
          author {
            id
            firstName
            email
          }
          runningInstances
          failedInstances
          ...AutomationFlowsList_flows
        }
      }
    }
  }
`;


const ConfigurationExecuteFlow = ({block}: Props) => {
  const data = useLazyLoadQuery<ConfigurationExecuteFlowQuery>(flowsQuery, {});
  console.log(data)
  const flowsx = useMemo(() => {
    const flowsData = data.flows?.edges || [];
    return flowsData.map(p => p.node).filter(Boolean);
  }, [data]);

  console.log('pp', flowsx)

  const {settings} = block;
  const flows = [
    {name: 'Flow 1', id: 'flow1'},
    {name: 'Flow 1', id: 'flow2'},
  ];

  const [executeFlowSettingsValues, handleInputChange] = useForm({
    flow: settings?.flow || '',
  });

  const {flow} = executeFlowSettingsValues;

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
        items={flows}
      />
    </Grid>
  );
};

export default ConfigurationExecuteFlow;
