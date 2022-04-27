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
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ParallelBlockType from '../../canvas/graph/shapes/blocks/blockTypes/Parallel/ParallelBlockType';
import Timer from '../../canvas/graph/shapes/blocks/blockTypes/timer/TimerBlockType';
import TriggerStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartBlockType';
import TriggerWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/triggerWorkforce/TriggerWorkforceBlockType';
import UpdateInventoryBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateInventory/UpdateInventoryBlockType';
import UpdateWorkforceBlockType from '../../canvas/graph/shapes/blocks/blockTypes/updateWorkforce/UpdateWorkforceBlockType';
import WaitSignalBlockType from '../../canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalBlockType';
import {DARK} from '@symphony/design-system/theme/symphony';
import {MenuCloseIcon} from '@symphony/design-system/icons';

import fbt from 'fbt';
import {Drawer, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';
import {useMemo, useState} from 'react';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
    position: 'fixed',
    top: 0,
    width: 'inherit',
    backgroundColor: '#FFF',
    zIndex: 2,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiDrawer-paper': {
      overflow: 'hidden',
      paddingTop: 64,
      borderRightWidth: 0,
      '&:hover': {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: 0,
        },
        '&::-webkit-scrollbar-thumb': {
          border: '4px solid rgba(0, 0, 0, 0)',
          backgroundClip: 'padding-box',
          borderRadius: 9999,
          backgroundColor: 'transparent',
        },
      },
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '73px !important',
  },
  iconMenu: {
    backgroundColor: 'transparent',
    color: DARK.D400,
    fill: DARK.D400,
    '& svg': {
      fill: DARK.D400,
    },
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      backgroundColor: 'transparent',
      '& svg': {
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
      },
    },
  },
}));

type Props = $ReadOnly<{|
  title: React.Node,
|}>;

export default function BlocksBar(props: Props) {
  const {title} = props;
  const flow = useGraph();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
    {header: fbt('Flow', ''), blockTypes: flowTypes, collapsed: open},
    {header: fbt('General', ''), blockTypes: general, collapsed: open},
    {header: fbt('Workforce', ''), blockTypes: workforceTypes, collapsed: open},
    {header: fbt('Inventory', ''), blockTypes: inventoryTypes, collapsed: open},
    {header: fbt('Configuration mgmt', ''), blockTypes: null, collapsed: open},
    {header: fbt('Pm', ''), blockTypes: null, collapsed: open},
    {header: fbt('FM', ''), blockTypes: null, collapsed: open},
    {header: fbt('SOM', ''), blockTypes: null, collapsed: open},
  ];

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${
        open ? classes.drawerClose : classes.drawerOpen
      }`}
      classes={{
        paper: open ? classes.drawerClose : classes.drawerOpen,
      }}>
      <div className={classes.toolbar}>
        {!open && title}
        <IconButton
          disableTouchRipple={true}
          color="secondary"
          className={classes.iconMenu}
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}>
          {open ? <MenuCloseIcon /> : <MenuOpenIcon />}
        </IconButton>
      </div>
      {listBlocksCategory.map(({header, blockTypes, collapsed}) => {
        return (
          <BlocksCategory
            key={header}
            header={header}
            blockTypes={blockTypes}
            collapsed={collapsed}
          />
        );
      })}
    </Drawer>
  );
}
