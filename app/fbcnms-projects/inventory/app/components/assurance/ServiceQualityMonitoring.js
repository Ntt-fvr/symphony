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

import InventoryErrorBoundary from '../../common/InventoryErrorBoundary';
import InventorySuspense from '../../common/InventorySuspense';
import KqiSourcesTypes from './KqiSourcesTypes';
import KqiTypes from './KqiTypes';
import React, {useEffect, useState} from 'react';
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

export default function ServiceQualityMonitoring() {
  const relativeUrl = useRelativeUrl();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const tabBars: Array<RouteTab> = [
    {
      id: 'kqi_sources',
      tab: {
        label: fbt('KQI SOURCES', 'kqi Sources'),
      },
      path: 'kqi_sources',
    },
    {
      id: 'kpi_types',
      tab: {
        label: fbt('KQI', 'kqi'),
      },
      path: 'kqi',
    },
  ];

  const tabMatch = location.pathname.match(/([^\/]*)\/*$/);
  const tabIndex =
    tabMatch == null ? -1 : tabBars.findIndex(el => el.id === tabMatch[1]);
  const [activeTabBar, setActiveTabBar] = useState<number>(
    tabIndex !== -1 ? tabIndex : 0,
  );

  useEffect(() => {
    ServerLogger.info(
      LogEvents.SERVICE_QUALITY_MONITORING_TAB_NAVIGATION_CLICKED,
      {
        id: tabBars[activeTabBar].id,
      },
    );
    history.push(
      `/assurance/service_quality_monitoring/${tabBars[activeTabBar].path}`,
    );
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
              path={relativeUrl('/kqi_sources')}
              component={KqiSourcesTypes}
            />
            <Route exact path={relativeUrl('/kqi')} component={KqiTypes} />
            <Redirect
              from={relativeUrl('/assurance/service_quality_monitoring')}
              to={relativeUrl('/kqi_sources')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
