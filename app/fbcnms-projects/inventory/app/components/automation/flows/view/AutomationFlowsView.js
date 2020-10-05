/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowsViewQuery} from './__generated__/AutomationFlowsViewQuery.graphql';

import * as React from 'react';
import AutomationFlowsList from './AutomationFlowsList';
import Button from '@symphony/design-system/components/Button';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import fbt from 'fbt';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {TESTING_PURPOSES} from '../builder/FlowBuilder';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useMemo} from 'react';
import {useRouter} from '@fbcnms/ui/hooks';

const useStyles = makeStyles(_theme => ({
  root: {},
  flowDraftCardContainer: {},
}));

const flowDraftsQuery = graphql`
  query AutomationFlowsViewQuery {
    flowDrafts(first: 500) @connection(key: "AutomationFlowsView_flowDrafts") {
      edges {
        node {
          ...AutomationFlowsList_flows
        }
      }
    }
  }
`;

type Props = $ReadOnly<{||}>;

export const AUTOMATION_FLOWS_VIEW_HEADER = `${fbt('Automation Flows', '')}`;

export default function AutomationFlowsView(_props: Props) {
  const classes = useStyles();
  const {history} = useRouter();

  const data = useLazyLoadQuery<AutomationFlowsViewQuery>(flowDraftsQuery, {});
  const flowDrafts = useMemo(() => {
    const flowDraftsData = data.flowDrafts?.edges || [];
    return flowDraftsData.map(p => p.node).filter(Boolean);
  }, [data]);

  const header = useMemo(
    () => ({
      title: AUTOMATION_FLOWS_VIEW_HEADER,
      subtitle: <fbt desc="">Create and manage Automation Flows</fbt>,
      actionButtons: [
        <Button
          key="1"
          onClick={() => {
            history.push(`flow/?flowId=${TESTING_PURPOSES}`);
          }}>
          <fbt desc="">Go to Flow Builder</fbt>
        </Button>,
        <Button
          key="2"
          onClick={() => {
            window.open(InventoryAPIUrls.flow(), '_blank');
          }}>
          <fbt desc="">Create new Flow</fbt>
        </Button>,
      ],
    }),
    [history],
  );

  return (
    <ViewContainer header={header} className={classes.root}>
      <AutomationFlowsList flows={flowDrafts} />
    </ViewContainer>
  );
}
