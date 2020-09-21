/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {DetailsView_flowDraft} from './__generated__/DetailsView_flowDraft.graphql';
import type {GraphSelectionContextType} from '../selection/GraphSelectionContext';
import type {WithFlowData} from '../../../data/FlowDataContext';

import * as React from 'react';
import JsonViewer from '../../tools/JsonViewer';
import Text from '@symphony/design-system/components/Text';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import fbt from 'fbt';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {withFlowData} from '../../../data/FlowDataContext';

const useStyles = makeStyles(() => ({
  root: {},
  header: {},
}));

type Props = $ReadOnly<{|
  flowSelection: GraphSelectionContextType,
|}>;

export default function DetailsPane(props: Props) {
  const classes = useStyles();

  const {flowSelection} = props;

  const selectionCount = flowSelection.selectedElements.length;

  if (selectionCount > 1) {
    return (
      <div className={classes.root}>
        <Text variant="subtitle1">
          <fbt desc="">
            <fbt:param name="Number of selected blocks on canvas" number={true}>
              {selectionCount}
            </fbt:param>
            Selected Blocks
          </fbt>
        </Text>
      </div>
    );
  }

  if (selectionCount === 0) {
    const title = (
      <>
        <Text variant="subtitle1">Name: </Text>
        <FlowDraftNameWithFragment />
      </>
    );
    return (
      <ViewContainer header={{title}} className={classes.root}>
        <JsonViewer />
      </ViewContainer>
    );
  }

  return null;
}

export function getDetailsTitle(
  selection: GraphSelectionContextType,
): React.Node {
  const selectionCount = selection.selectedElements.length;

  if (selectionCount === 1) {
    return selection.selectedElements[0].type;
  }

  if (selectionCount > 1) {
    return fbt('Selection', '');
  }

  return 'Flow Details';
}

type FlowDraftNameProps = WithFlowData<DetailsView_flowDraft>;

function FlowDraftName(props: FlowDraftNameProps) {
  const {flowDraft} = props;

  return <Text>{flowDraft?.name ?? 'not loaded'}</Text>;
}

const FlowDraftNameWithFragment = withFlowData(
  createFragmentContainer(FlowDraftName, {
    flowDraft: graphql`
      fragment DetailsView_flowDraft on FlowDraft {
        name
      }
    `,
  }),
);
