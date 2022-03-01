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

import AppContext from '@fbcnms/ui/context/AppContext';
import InventoryErrorBoundary from '../../common/InventoryErrorBoundary';
import InventorySuspense from '../../common/InventorySuspense';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import TabsBar from '@symphony/design-system/components/Tabs/TabsBar';
import fbt from 'fbt';
import {ChangeRequestTypes} from '../../components/change_request/ChangeRequestTypes';
import {ConfigurationsTypes} from '../../components/change_request/ConfigurationsTypes';
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
  const servicesEnabled = useContext(AppContext).isFeatureEnabled(
    'change_request',
  );
  const tabBars: Array<RouteTab> = useMemo(
    () => [
      {
        id: 'configurations_types',
        tab: {
          label: fbt('CONFIGURATIONS', ''),
        },
        path: 'configurations_types',
      },

      {
        id: 'change_request_types',
        tab: {
          label: fbt('CHANGE REQUEST', ''),
        },
        path: 'change_request_types',
      },
    ],
    [servicesEnabled],
  );
  const tabMatch = location.pathname.match(/([^\/]*)\/*$/);
  const tabIndex =
    tabMatch == null ? -1 : tabBars.findIndex(el => el.id === tabMatch[1]);
  const [activeTabBar, setActiveTabBar] = useState<number>(
    tabIndex !== -1 ? tabIndex : 0,
  );

  useEffect(() => {
    ServerLogger.info(LogEvents.CHANGE_REQUEST_TAB_NAVIGATION_CLICKED, {
      id: tabBars[activeTabBar].id,
    });
    history.push(`/inventory/change_request/${tabBars[activeTabBar].path}`);
  }, [tabBars, activeTabBar, history]);

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
              path={relativeUrl('/configurations_types')}
              component={ConfigurationsTypes}
            />
            <Route
              path={relativeUrl('/change_request_types')}
              component={ChangeRequestTypes}
            />
            <Redirect
              from={relativeUrl('/')}
              to={relativeUrl('/configurations_types')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
