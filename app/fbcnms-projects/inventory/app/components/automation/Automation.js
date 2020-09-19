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
import {AppContextProvider} from '@fbcnms/ui/context/AppContext';

import AppContent from '@fbcnms/ui/components/layout/AppContent';
import AppContext from '@fbcnms/ui/context/AppContext';
import AppSideBar from '@fbcnms/ui/components/layout/AppSideBar';
import ApplicationMain from '@fbcnms/ui/components/ApplicationMain';
import ComputerIcon from '@material-ui/icons/Computer';
import FlowBuilder from './flows/builder/FlowBuilder';
import LoadingIndicator from '../../common/LoadingIndicator';
import NavListItem from '@fbcnms/ui/components/NavListItem';
import RelayEnvironment from '../../common/RelayEnvironment';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {RelayEnvironmentProvider} from 'react-relay/hooks';

import AutomationFlowsView from './flows/view/AutomationFlowsView';
import {Suspense, useContext} from 'react';
import {getProjectLinks} from '@fbcnms/projects/projects';
import {makeStyles} from '@material-ui/styles';
import {shouldShowSettings} from '../Settings';
import {useRelativeUrl} from '@fbcnms/ui/hooks/useRouter';

const useStyles = makeStyles(_theme => ({
  root: {
    display: 'flex',
  },
}));

function NavItems() {
  const relativeUrl = useRelativeUrl();

  return (
    <>
      <NavListItem
        label="Flows"
        path={relativeUrl('/flows')}
        icon={<ComputerIcon />}
      />
    </>
  );
}

const FLOW_BUILDER_PATH = '/flow/';

function NavRoutes() {
  const relativeUrl = useRelativeUrl();
  return (
    <Switch>
      <Route path={relativeUrl('/flows')} component={AutomationFlowsView} />
      <Route path={relativeUrl(FLOW_BUILDER_PATH)} component={FlowBuilder} />
      <Redirect to={relativeUrl('/flows')} />
    </Switch>
  );
}

function Automation() {
  const classes = useStyles();
  const {tabs, user, ssoEnabled} = useContext(AppContext);

  const location = useLocation();
  const shouldHideAppSideBar = location.pathname.includes(FLOW_BUILDER_PATH);

  return (
    <div className={classes.root}>
      {!shouldHideAppSideBar ? (
        <AppSideBar
          mainItems={<NavItems />}
          projects={getProjectLinks(tabs, user)}
          user={user}
          showSettings={shouldShowSettings({
            isSuperUser: user.isSuperUser,
            ssoEnabled,
          })}
        />
      ) : null}
      <AppContent>
        <Suspense fallback={<LoadingIndicator />}>
          <NavRoutes />
        </Suspense>
      </AppContent>
    </div>
  );
}

export default () => {
  return (
    <ApplicationMain>
      <AppContextProvider>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Automation />
        </RelayEnvironmentProvider>
      </AppContextProvider>
    </ApplicationMain>
  );
};
