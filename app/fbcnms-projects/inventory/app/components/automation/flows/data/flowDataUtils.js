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
import {generateTempId, getGraphError} from '../../../../common/EntUtils';
import type {
  ActionBlockInput,
  ConnectorInput,
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
    cid: block.id,
    name: `Start block ${generateTempId()}`,
    paramDefinitions: [],
    uiRepresentation: {
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapActionBlocksForSave(block: IBlock): ActionBlockInput {
  return {
    cid: block.id,
    name: `Action block ${generateTempId()}`,
    params: [],
    actionType: 'work_order',
    uiRepresentation: {
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapEndBlockForSave(block: IBlock): EndBlockInput {
  return {
    cid: block.id,
    name: `End block ${generateTempId()}`,
    params: [],
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
