/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowsList_flows} from './__generated__/AutomationFlowsList_flows.graphql';

import * as React from 'react';
import AutomationFlowCard from './AutomationFlowCard';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  flowsList: {
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    width: '1680px', // TODO: remove when container width is set
  },
}));

type Props = $ReadOnly<{|
  flows: AutomationFlowsList_flows,
|}>;

function AutomationFlowsList(props: Props) {
  const {flows} = props;
  const classes = useStyles();

  return flows.length > 0 ? (
    <div className={classes.flowsList}>
      {flows.map(flow => (
        <AutomationFlowCard key={flow.id} flowDraft={flow} />
      ))}
    </div>
  ) : (
    <div>No flows available</div>
  );
}

export default createFragmentContainer(AutomationFlowsList, {
  flows: graphql`
    fragment AutomationFlowsList_flows on FlowDraft @relay(plural: true) {
      id
      ...AutomationFlowCard_flowDraft
    }
  `,
});
