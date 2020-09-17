/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowCard_flowDraft} from './__generated__/AutomationFlowCard_flowDraft.graphql';

import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(_theme => ({
  root: {
    display: 'flex',
  },
}));

type Props = $ReadOnly<{|
  flowDraft: AutomationFlowCard_flowDraft,
|}>;

function AutomationFlowCard(props: Props) {
  const classes = useStyles();
  const {flowDraft} = props;

  return (
    <div className={classes.root}>
      <Button
        key="1"
        variant="text"
        onClick={() => {
          window.open(InventoryAPIUrls.flow(flowDraft.id), '_blank');
        }}>
        {flowDraft.name}
      </Button>
    </div>
  );
}

export default createFragmentContainer(AutomationFlowCard, {
  flowDraft: graphql`
    fragment AutomationFlowCard_flowDraft on FlowDraft {
      id
      name
      blocks {
        id
        name
      }
    }
  `,
});
