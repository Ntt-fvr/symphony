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
import ChoiceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/choice/ChoiceBlockType';
import CreateWorkorderBlockType from '../../canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import EndBlockType from '../../canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import ExecuteFlowBlockType from '../../canvas/graph/shapes/blocks/blockTypes/executeFlow/ExecuteFlowBlockType';
import ExecuteNetworkActionBlockType from '../../canvas/graph/shapes/blocks/blockTypes/executeNetworkAction/ExecuteNetworkActionBlockType';
import ForEachLoop from '../../canvas/graph/shapes/blocks/blockTypes/forEachLoop/ForEachLoopBlockType';
import GoToBlockType from '../../canvas/graph/shapes/blocks/blockTypes/goTo/GoToBlockType';
import InvokeRestApiBlockType from '../../canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiBlockType';
import ManualStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import ParallelBlockType from '../../canvas/graph/shapes/blocks/blockTypes/parallel/ParallelBlockType';
import Timer from '../../canvas/graph/shapes/blocks/blockTypes/timer/TimerBlockType';
import TriggerStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartBlockType';
import TriggerWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerWorkforce/TriggerWorkforceBlockType';
import UpdateInventoryBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateInventory/UpdateInventoryBlockType';
import UpdateWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateWorkforce/UpdateWorkforceBlockType';
import WaitSignalBlockType from '../../canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalBlockType';
import {BackFlow} from '@symphony/design-system/icons';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Sidebar from '../../widgets/detailsPanel/inputs/Sidebar';
import fbt from 'fbt';
import {DARK} from '@symphony/design-system/theme/symphony';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';
import {useMemo} from 'react';
import {useRouter} from '@fbcnms/ui/hooks';
const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    '& div[class*="toolbar"]': {
      borderBottom: `1px solid ${DARK.D100}`,
    },
  },
  list: {
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      paddingRight: 8,
    },
    '& .MuiListItem-root': {
      paddingTop: 12,
      paddingBottom: 12,
      borderBottom: `1px solid ${DARK.D100}`,
    },
  },
}));

type Props = $ReadOnly<{|
  title: React.Node,
|}>;

export default function BlocksBar(props: Props) {
  const classes = useStyles();
  const {title} = props;
  const flow = useGraph();
  const {history} = useRouter();

  const [sidebarOpened, setSidebarOpened] = React.useState(false);

  const flowTypes = useMemo(
    () => [
      new ManualStartBlockType(flow),
      new EndBlockType(flow),
      //new TriggerStartBlockType(flow),
      new Timer(flow),
      // new ForEachLoop(flow),
      new ChoiceBlockType(flow),
      // new ParallelBlockType(flow),
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
      //new ExecuteNetworkActionBlockType(flow),
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
    // Comment to hide indesign blocks
    // {header: fbt('Workforce', ''), blockTypes: workforceTypes},
    // {header: fbt('Inventory', ''), blockTypes: inventoryTypes},
    // {header: fbt('Configuration mgmt', ''), blockTypes: null},
    // {header: fbt('Pm', ''), blockTypes: null},
    // {header: fbt('FM', ''), blockTypes: null},
    // {header: fbt('SOM', ''), blockTypes: null},
  ];

  const ListBlocksCategory = () => {
    return listBlocksCategory.map(({header, blockTypes}) => {
      return (
        <BlocksCategory key={header} header={header} blockTypes={blockTypes} />
      );
    });
  };

  return (
    <div className={classes.root}>
      <Sidebar
        drawerWidth={drawerWidth}
        title={title}
        openDefault={false}
        collapsed={value => setSidebarOpened(value)}
        children={
          <div>
            <List disablePadding className={classes.list}>
              <ListItem
                button
                onClick={() => {
                  history.push('/automation/flows');
                }}>
                <ListItemIcon>
                  <BackFlow />
                </ListItemIcon>
                {!sidebarOpened && (
                  <ListItemText
                    primary={
                      <Grid item xs zeroMinWidth>
                        <Typography variant={'caption'} noWrap>
                          {'Back to flows catalog'}
                        </Typography>
                      </Grid>
                    }
                  />
                )}
              </ListItem>
            </List>
            {ListBlocksCategory()}
          </div>
        }
      />
    </div>
  );
}
