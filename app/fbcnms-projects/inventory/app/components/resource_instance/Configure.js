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
import {Configuration} from './Configuration';
import {Details} from './Details';
import {Documents} from './Documents';
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
        id: 'details_types',
        tab: {
          label: fbt('DETAILS', ''),
        },
        path: 'details_types',
      },
      {
        id: 'configuration_types',
        tab: {
          label: fbt('CONFIGURATION', ''),
        },
        path: 'configuration_types',
      },
      {
        id: 'documents_types',
        tab: {
          label: fbt('DOCUMENTS', ''),
        },
        path: 'documents_types',
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

  useEffect(() => {
    ServerLogger.info(LogEvents.CONFIGURE_TAB_NAVIGATION_CLICKED, {
      id: tabBars[activeTabBar].id,
    });
    history.push(`/inventory/inventory/${tabBars[activeTabBar].path}`);
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
            <Route path={relativeUrl('/details_types')} component={Details} />
            <Route
              path={relativeUrl('/configuration_types')}
              component={Configuration}
            />
            <Route
              path={relativeUrl('/documents_types')}
              component={Documents}
            />
            <Redirect
              from={relativeUrl('/')}
              to={relativeUrl('/details_types')}
            />
          </Switch>
        </InventorySuspense>
      </InventoryErrorBoundary>
    </div>
  );
}
