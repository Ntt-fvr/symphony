/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FlowDraft} from '../../FlowBuilder';

import BlocksCategory from './BlocksCategory';
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import CreateWorkorderBlockType from '../../canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import EndBlockType from '../../canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import ManualStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import React from 'react';
import SideBar from '@symphony/design-system/components/View/SideBar';
import {AUTOMATION_FLOWS_VIEW_HEADER} from '../../../view/AutomationFlowsView';
import {InventoryAPIUrls} from '../../../../../../common/InventoryAPI';
import {useGraph} from '../../canvas/graph/GraphContext';
import {useHistory} from 'react-router-dom';
import {useMemo} from 'react';

type Props = $ReadOnly<{|
  flowDraft: ?FlowDraft,
|}>;

export default function BlocksBar(props: Props) {
  const {flowDraft} = props;
  const flow = useGraph();
  const history = useHistory();

  const flowName = flowDraft?.name;
  const title = useMemo(() => {
    const breadcrumbs = [
      {
        id: 'automation_flows',
        name: AUTOMATION_FLOWS_VIEW_HEADER,
        onClick: () => history.replace(InventoryAPIUrls.flows()),
      },
    ];
    if (flowName != null && flowName.length > 0) {
      breadcrumbs.push({
        id: 'flow',
        name: flowName,
      });
    }
    return <Breadcrumbs breadcrumbs={breadcrumbs} size="small" />;
  }, [flowName, history]);

  const administrativeTypes = useMemo(
    () => [new ManualStartBlockType(flow), new EndBlockType(flow)],
    [flow],
  );

  const actionTypes = useMemo(() => [new CreateWorkorderBlockType(flow)], [
    flow,
  ]);

  return (
    <SideBar header={title}>
      <BlocksCategory
        header="Administrative"
        blockTypes={administrativeTypes}
      />
      <BlocksCategory header="Actions" blockTypes={actionTypes} />
    </SideBar>
  );
}
