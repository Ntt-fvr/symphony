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
import BlocksCategory from './BlocksCategory';
import CreateWorkorderBlockType from '../../canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import DecisionBlockType from '../../canvas/graph/shapes/blocks/blockTypes/decision/DecisionBlockType';
import EndBlockType from '../../canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import ExecuteFlowBlockType from '../../canvas/graph/shapes/blocks/blockTypes/executeFlow/ExecuteFlowBlockType';
import ExecuteNetworkActionBlockType from '../../canvas/graph/shapes/blocks/blockTypes/executeNetworkAction/ExecuteNetworkActionBlockType';
import ForEachLoop from '../../canvas/graph/shapes/blocks/blockTypes/forEachLoop/ForEachLoopBlockType';
import GoToBlockType from '../../canvas/graph/shapes/blocks/blockTypes/goTo/GoToBlockType';
import InvokeRestApiBlockType from '../../canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiBlockType';
import ManualStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import ParallelBlockType from '../../canvas/graph/shapes/blocks/blockTypes/Parallel/ParallelBlockType';
import Timer from '../../canvas/graph/shapes/blocks/blockTypes/timer/TimerBlockType';
import TriggerStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartBlockType';
import TriggerWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerWorkforce/TriggerWorkforceBlockType';
import UpdateInventoryBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateInventory/UpdateInventoryBlockType';
import UpdateWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateWorkforce/UpdateWorkforceBlockType';
import WaitSignalBlockType from '../../canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalBlockType';

import Sidebar from '../../../../inputs/Sidebar';
import fbt from 'fbt';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';
import {useMemo} from 'react';
const drawerWidth = 240;

type Props = $ReadOnly<{|
  title: React.Node,
|}>;

export default function BlocksBar(props: Props) {
  const {title} = props;
  const flow = useGraph();

  const flowTypes = useMemo(
    () => [
      new ManualStartBlockType(flow),
      new EndBlockType(flow),
      new TriggerStartBlockType(flow),
      new Timer(flow),
      new ForEachLoop(flow),
      new DecisionBlockType(flow),
      new ParallelBlockType(flow),
      new GoToBlockType(flow),
    ],
    [flow],
  );

  const inventoryTypes = useMemo(() => [new UpdateInventoryBlockType(flow)], [
    flow,
  ]);

  const general = useMemo(
    () => [
      new ExecuteFlowBlockType(flow),
      new WaitSignalBlockType(flow),
      new InvokeRestApiBlockType(flow),
      new ExecuteNetworkActionBlockType(flow),
    ],
    [flow],
  );

  const workforceTypes = useMemo(
    () => [
      new TriggerWorkforceBlockType(flow),
      new CreateWorkorderBlockType(flow),
      new UpdateWorkforceBlockType(flow),
    ],
    [flow],
  );

  const listBlocksCategory = [
    {header: fbt('Flow', ''), blockTypes: flowTypes},
    {header: fbt('General', ''), blockTypes: general},
    {header: fbt('Workforce', ''), blockTypes: workforceTypes},
    {header: fbt('Inventory', ''), blockTypes: inventoryTypes},
    {header: fbt('Configuration mgmt', ''), blockTypes: null},
    {header: fbt('Pm', ''), blockTypes: null},
    {header: fbt('FM', ''), blockTypes: null},
    {header: fbt('SOM', ''), blockTypes: null},
  ];

  const ListBlocksCategory = () => {
    return listBlocksCategory.map(({header, blockTypes}) => {
      return (
        <BlocksCategory key={header} header={header} blockTypes={blockTypes} />
      );
    });
  };

  return (
    <Sidebar
      drawerWidth={drawerWidth}
      title={title}
      children={ListBlocksCategory()}
    />
  );
}
