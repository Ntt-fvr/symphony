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

import CountersTypes from './CountersTypes';
import InventoryErrorBoundary from '../../common/InventoryErrorBoundary';
import InventorySuspense from '../../common/InventorySuspense';
import KpiTypes from './KpiTypes';
import React, {useEffect, useState} from 'react';
import TabsBar from '@symphony/design-system/components/Tabs/TabsBar';
import ThresholdTypes from './ThresholdTypes';
import AddRuleItemForm from './AddRuleItemForm';
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

export default function PerformanceCatalog() {
  const relativeUrl = useRelativeUrl();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const tabBars: Array<RouteTab> = [
    {
      id: 'counters_types',
      tab: {
        label: fbt('COUNTERS', 'Counters'),
      },
      path: 'counters_types',
    },
    {
      id: 'kpi_types',
      tab: {
        label: fbt('KPI', 'Kpi'),
      },
      path: 'kpi_types',
    },
    {
      id: 'threshold_types',
      tab: {
        label: fbt('THRESHOLD', 'Threshold'),
      },
      path: 'threshold_types',
    },
  ];

  const tabMatch = location.pathname.match(/([^\/]*)\/*$/);
  const tabIndex =
    tabMatch == null ? -1 : tabBars.findIndex(el => el.id === tabMatch[1]);
  const [activeTabBar, setActiveTabBar] = useState<number>(
    tabIndex !== -1 ? tabIndex : 0,
  );

  useEffect(() => {
    ServerLogger.info(LogEvents.PERFORMANCE_TAB_NAVIGATION_CLICKED, {
      id: tabBars[activeTabBar].id,
    });
    history.push(`/assurance/performance/${tabBars[activeTabBar].path}`);
  }, [activeTabBar, history]);

  return (
    <div className={classes.root}>
      <TabsBar
        spread={true}
        size="large"
        tabs={tabBars.map(tabBar => tabBar.tab)}
        activeTabIndex={activeTabBar}
        onChange={setActiveTabBar}
      />
      <InventoryErrorBoundary>
        <InventorySuspense>
          <Switch>
            <Route
              exact
              path={relativeUrl('/counters_types')}
              component={CountersTypes}
            />
            <Route
              exact
              path={relativeUrl('/kpi_types')}
              component={KpiTypes}
            />
            <Route
              exact
              path={relativeUrl('/threshold_types')}
              component={ThresholdTypes}
            />
            <Redirect
              from={relativeUrl('/assurance/performance')}
              to={relativeUrl('/counters_types')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
