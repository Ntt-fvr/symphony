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

import Button from '@symphony/design-system/components/Button';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';
import {useMemo} from 'react';
import {useRouter} from '@fbcnms/ui/hooks';

const useStyles = makeStyles(_theme => ({
  root: {
    display: 'flex',
  },
}));

type Props = $ReadOnly<{||}>;

export default function AutomationFlowsView(_props: Props) {
  const classes = useStyles();
  const {history} = useRouter();

  const header = useMemo(
    () => ({
      title: <fbt desc="">Automation Flows</fbt>,
      subtitle: <fbt desc="">List of all automation flows in the system</fbt>,
      actionButtons: [
        <Button
          onClick={() => {
            history.push(`flow/x`);
          }}>
          Go to Flow Builder
        </Button>,
      ],
    }),
    [history],
  );

  return (
    <ViewContainer header={header} className={classes.root}>
      Table of all flows
    </ViewContainer>
  );
}
