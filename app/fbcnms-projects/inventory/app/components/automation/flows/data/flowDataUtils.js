/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @flow
 * @format
 */
import ImportFlowDraftMutation from '../../../../mutations/ImportFlowDraft';
import {getGraphError} from '../../../../common/EntUtils';
import type {
  ActionBlockInput,
  ConnectorInput,
  DecisionBlockInput,
  EndBlockInput,
  ImportFlowDraftInput,
  StartBlockInput,
} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {IBlock} from '../builder/canvas/graph/shapes/blocks/BaseBlock';
import type {IConnector} from '../builder/canvas/graph/shapes/connectors/BaseConnector';
import type {ImportFlowDraftMutationResponse} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {MutationCallbacks} from '../../../../mutations/MutationCallbacks';

export function saveFlowDraft(
  input: ImportFlowDraftInput,
): Promise<ImportFlowDraftMutationResponse> {
  return new Promise<ImportFlowDraftMutationResponse>((resolve, reject) => {
    const callbacks: MutationCallbacks<ImportFlowDraftMutationResponse> = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          reject(getGraphError(errors[0]));
        }
        resolve(response);
      },
      onError: error => {
        reject(getGraphError(error));
      },
    };
    ImportFlowDraftMutation({input}, callbacks);
  });
}

export function mapStartBlockForSave(block: IBlock): StartBlockInput {
  return {
    ...mapBlockForSave(block),
    paramDefinitions: [],
  };
}

export function mapDecisionBlockForSave(block: IBlock): DecisionBlockInput {
  return {
    ...mapBlockForSave(block),
  };
}

export function mapActionBlocksForSave(block: IBlock): ActionBlockInput {
  return {
    ...mapBlockForSave(block),
    params: [],
    actionType: 'work_order',
  };
}

export function mapEndBlockForSave(block: IBlock): EndBlockInput {
  return {
    ...mapBlockForSave(block),
    params: [],
  };
}

type BaseBlockInput = $ReadOnly<{|
  cid: string,
  name: string,
  uiRepresentation: {|
    xPosition: number,
    yPosition: number,
  |},
|}>;

function mapBlockForSave(block: IBlock): BaseBlockInput {
  return {
    cid: block.id,
    name: block.name,
    uiRepresentation: {
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapConnectorsForSave(connector: IConnector): ConnectorInput {
  return {
    sourceBlockCid: connector.source?.id ?? '',
    targetBlockCid: connector.target?.id ?? '',
  };
}
