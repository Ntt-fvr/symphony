/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {BlocksBar_flowDraft} from './__generated__/BlocksBar_flowDraft.graphql';
import type {WithFlowData} from '../../../data/FlowDataContext';

import BlocksCategory from './BlocksCategory';
import CreateWorkorderBlockType from '../../canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import DecisionBlockType from '../../canvas/graph/shapes/blocks/blockTypes/decision/DecisionBlockType';
import EndBlockType from '../../canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import Logo from '../../../../../../common/Logo';
import ManualStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import React from 'react';
import SideBar from '@symphony/design-system/components/View/SideBar';
import Text from '@symphony/design-system/components/Text';
import {InventoryAPIUrls} from '../../../../../../common/InventoryAPI';
import {Link} from 'react-router-dom';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';
import {useMemo} from 'react';
import {useState} from 'react';
import {withFlowData} from '../../../data/FlowDataContext';

const COLLAPSED_WIDTH = '80px';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginLeft: '22px',
  },
  collapsed: {
    width: COLLAPSED_WIDTH,
    minWidth: COLLAPSED_WIDTH,
    maxWidth: COLLAPSED_WIDTH,
    flexBasis: COLLAPSED_WIDTH,
  },
  logo: {
    display: 'flex',
  },
}));

type Props = WithFlowData<BlocksBar_flowDraft>;

function BlocksBar(props: Props) {
  const {flowDraft} = props;
  const flow = useGraph();
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const flowName = flowDraft?.name;
  const title = useMemo(() => {
    return (
      <div className={classes.header}>
        <Link className={classes.logo} to={InventoryAPIUrls.flows()}>
          <Logo />
        </Link>
        {!collapsed && (
          <Text className={classes.name} variant="h6" useEllipsis={true}>
            {flowName}
          </Text>
        )}
      </div>
    );
  }, [flowName, classes, collapsed]);

  const administrativeTypes = useMemo(
    () => [new ManualStartBlockType(flow), new EndBlockType(flow)],
    [flow],
  );

  const actionTypes = useMemo(() => [new CreateWorkorderBlockType(flow)], [
    flow,
  ]);

  const logicTypes = useMemo(() => [new DecisionBlockType(flow)], [flow]);

  const callback = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <SideBar
      header={title}
      collapsible={true}
      collapseCallback={callback}
      className={collapsed ? classes.collapsed : ''}>
      <BlocksCategory
        collapsed={collapsed}
        header="Events"
        blockTypes={administrativeTypes}
      />
      <BlocksCategory
        collapsed={collapsed}
        header="Actions"
        blockTypes={actionTypes}
      />
      <BlocksCategory
        collapsed={collapsed}
        header="Logic"
        blockTypes={logicTypes}
      />
    </SideBar>
  );
}

export default withFlowData(
  createFragmentContainer(BlocksBar, {
    flowDraft: graphql`
      fragment BlocksBar_flowDraft on FlowDraft {
        name
      }
    `,
  }),
);
