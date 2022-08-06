/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import type {TabProps} from '@symphony/design-system/components/Tabs/TabsBar';

import ExecutionsTypes from './ExecutionsTypes';
import InventoryErrorBoundary from '../../common/InventoryErrorBoundary';
import InventorySuspense from '../../common/InventorySuspense';
import React, {useEffect, useMemo, useState} from 'react';
import ScheduledActionsTypes from './ScheduledActionsTypes';
import TabsBar from '@symphony/design-system/components/Tabs/TabsBar';
import fbt from 'fbt';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {Redirect, Route, Switch} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {useHistory, useLocation} from 'react-router';
import {useRelativeUrl} from '@fbcnms/ui/hooks/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    transform: 'translateZ(0)',
  },
  tabs: {
    backgroundColor: 'white',
    borderBottom: `1px ${theme.palette.grey[200]} solid`,
    minHeight: '60px',
    overflow: 'visible',
  },
  tabContainer: {
    width: '250px',
  },
  tabsRoot: {
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
  },
}));

type RouteTab = {
  id: string,
  tab: TabProps,
  path: string,
};

export default function ActionExecutionMain() {
  const relativeUrl = useRelativeUrl();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const tabBars: Array<RouteTab> = useMemo(
    () => [
      {
        id: 'scheduled_actions_types',
        tab: {
          label: fbt('SCHEDULED ACTIONS', ''),
        },
        path: 'scheduled_actions_types',
      },

      {
        id: 'executions_types',
        tab: {
          label: fbt('EXECUTIONS', ''),
        },
        path: 'executions_types',
      },
    ],
    [],
  );
  const tabMatch = location.pathname.match(/([^\/]*)\/*$/);
  const tabIndex =
    tabMatch == null ? -1 : tabBars.findIndex(el => el.id === tabMatch[1]);
  const [activeTabBar, setActiveTabBar] = useState<number>(
    tabIndex !== -1 ? tabIndex : 0,
  );
  const [canChangeHistory, setCanChangeHistory] = useState(true);

  const changeTab = index => {
    setCanChangeHistory(true);
    setActiveTabBar(index);
  };
  window.onpopstate = () => {
    setCanChangeHistory(false);
    setActiveTabBar(tabIndex);
  };

  useEffect(() => {
    ServerLogger.info(LogEvents.ACTION_EXECUTION_TAB_NAVIGATION_CLICKED, {
      id: tabBars[activeTabBar].id,
    });
    canChangeHistory &&
      history.push(`/inventory/action_execution/${tabBars[activeTabBar].path}`);
  }, [tabBars, activeTabBar, history]);

  return (
    <div className={classes.root}>
      <TabsBar
        spread={true}
        size="large"
        tabs={tabBars.map(tabBar => tabBar.tab)}
        activeTabIndex={tabIndex === 0 ? 0 : activeTabBar}
        onChange={changeTab}
      />
      <InventoryErrorBoundary>
        <InventorySuspense>
          <Switch>
            <Route
              path={relativeUrl('/scheduled_actions_types')}
              component={ScheduledActionsTypes}
            />
            <Route
              path={relativeUrl('/executions_types')}
              component={ExecutionsTypes}
            />
            <Redirect
              from={relativeUrl('/')}
              to={relativeUrl('/scheduled_actions_types')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
