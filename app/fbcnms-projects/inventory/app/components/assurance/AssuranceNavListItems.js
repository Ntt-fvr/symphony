/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AppRegistrationIcon from '@material-ui/icons/AppRegistration';
import ManageAccountsIcon from '@material-ui/icons/ManageAccounts';
import NavListItem from '@fbcnms/ui/components/NavListItem';
import React from 'react';
import SummarizeIcon from '@material-ui/icons/Summarize';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {useRelativeUrl} from '@fbcnms/ui/hooks/useRouter';

export const AssuranceNavListItems = () => {
  const relativeUrl = useRelativeUrl();
  return [
    <NavListItem
      key={1}
      label="Performance Catalog"
      path={relativeUrl('/performance/counters_types')}
      icon={<SummarizeIcon />}
      onClick={() => {
        ServerLogger.info(LogEvents.PERFORMANCE_TAB_NAVIGATION_CLICKED);
      }}
    />,
  ];
};
