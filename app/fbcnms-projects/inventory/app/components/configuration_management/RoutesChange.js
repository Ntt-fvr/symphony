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
import React, {useEffect, useMemo, useState} from 'react';
import TabsBar from '@symphony/design-system/components/Tabs/TabsBar';
import fbt from 'fbt';
import {ChangeRequestView} from './ChangeRequestView';
import {ConfigurationsView} from './ConfigurationsView';
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

export default function Configure() {
  const relativeUrl = useRelativeUrl();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const tabBars: Array<RouteTab> = useMemo(
    () => [
      {
        id: 'configurations_types',
        tab: {
          label: fbt('CONFIGURATIONS', ''),
        },
        path: 'configurations_view',
      },

      {
        id: 'change_request_types',
        tab: {
          label: fbt('CHANGE REQUEST', ''),
        },
        path: 'change_request_types',
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
    ServerLogger.info(LogEvents.CHANGE_REQUEST_TAB_NAVIGATION_CLICKED, {
      id: tabBars[activeTabBar].id,
    });
    canChangeHistory &&
      history.push(
        `/inventory/configuration_management/${tabBars[activeTabBar].path}`,
      );
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
              path={relativeUrl('/configurations_view')}
              component={ConfigurationsView}
            />
            <Route
              path={relativeUrl('/change_request_types')}
              component={ChangeRequestView}
            />
            <Redirect
              from={relativeUrl('/')}
              to={relativeUrl('/configurations_view')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
