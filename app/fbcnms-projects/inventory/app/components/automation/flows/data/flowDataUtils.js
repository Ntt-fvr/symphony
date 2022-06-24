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
import type {
  ActionBlockInput,
  ActionTypeId,
  ConnectorInput,
  DecisionBlockInput,
  DecisionRouteInput,
  EndBlockInput,
  GotoBlockInput,
  ImportFlowDraftInput,
  ImportFlowDraftMutationResponse,
  StartBlockInput,
  TriggerBlockInput,
  TriggerTypeId,
  TrueFalseBlockInput,
} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {IBlock} from '../builder/canvas/graph/shapes/blocks/BaseBlock';
import type {IConnector} from '../builder/canvas/graph/shapes/connectors/BaseConnector';
import type {IShape} from '../builder/canvas/graph/facades/shapes/BaseShape';
import type {MutationCallbacks} from '../../../../mutations/MutationCallbacks';
import type {
  PublishFlowInput,
  PublishFlowMutationResponse,
} from '../../../../mutations/__generated__/PublishFlowMutation.graphql';

import ImportFlowDraftMutation from '../../../../mutations/ImportFlowDraft';
import PublishFlowMutation from '../../../../mutations/PublishFlowMutation';
import {getGraphError} from '../../../../common/EntUtils';
import {isLasso} from '../builder/canvas/graph/facades/shapes/vertexes/helpers/Lasso';

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

export function publishFlow(
  input: PublishFlowInput,
): Promise<PublishFlowMutationResponse> {
  return new Promise<PublishFlowMutationResponse>((resolve, reject) => {
    const callbacks: MutationCallbacks<PublishFlowMutationResponse> = {
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
    PublishFlowMutation({input}, callbacks);
  });
}

type StartBlockInputType = {
  ...StartBlockInput,
  ...BaseBlockInput,
};

export function mapStartBlockForSave(block: IBlock): StartBlockInputType {
  return {
    ...mapBlockForSave(block),
    paramDefinitions: [],
  };
}

export type DecisionRouteInputType = Array<{|
  cid?: ?string,
  name: String,
  ...DecisionRouteInput,
|}>;
type DecisionBlockInputType = {
  routes: DecisionRouteInputType,
  stateParamDefinitions: string,
  ...DecisionBlockInput,
  ...BaseBlockInput,
};

export function mapDecisionBlockForSave(block: IBlock): DecisionBlockInputType {
  return {
    ...mapBlockForSave(block),
    routes: [],
    stateParamDefinitions: '',
  };
}

type TrueFalseBlockInputType = {
  ...TrueFalseBlockInput,
  ...BaseBlockInput,
};

export function mapTrueFalseBlockForSave(
  block: IBlock,
): TrueFalseBlockInputType {
  return {
    ...mapBlockForSave(block),
  };
}

type GotoBlockInputType = {
  ...GotoBlockInput,
  type: string,
};

export function mapGoToBlockForSave(block: IBlock): GotoBlockInputType {
  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
    targetBlockCid: '',
    type: block.settings.type,
  };
}

type ActionBlockInputType = {
  ...ActionBlockInput,
  ...BaseBlockInput,
};

export function mapActionBlocksForSave(
  block: IBlock,
  actionType: ActionTypeId,
): ActionBlockInputType {
  return {
    ...mapBlockForSave(block),
    actionType,
    params: [],
  };
}

type TriggerBlockInputType = {
  signalModule: string,
  customFilter: string,
  blocked: boolean,
  ...TriggerBlockInput,
};

export function mapTriggerBlocksForSave(
  block: IBlock,
  triggerType: TriggerTypeId,
): TriggerBlockInputType {
  return {
    ...mapBlockForSave(block),
    triggerType,
    signalModule: '',
    customFilter: '',
    blocked: true,
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
  uiRepresentation: {|
    name: string,
    xPosition: number,
    yPosition: number,
  |},
  enableInputTransformation: boolean,
  inputTransfStrategy?: string,
  inputParamDefinitions?: string,
  enableInputStateTransformation: boolean,
  inputStateTransfStrategy: string,
  inputStateParamDefinitions: string,
  enableOutputTransformation: boolean,
  outputTranfStrategy?: string,
  outputParamDefinitions?: string,
  enableOutputStateTransformation: boolean,
  outputStateTransfStrategy: string,
  outputStateParamDefinitions: string,
  enableErrorHandling?: boolean,
  enableRetryPolicy?: boolean,
  retryInterval?: number,
  units?: string,
  maxAttemps?: number,
  backoffRate?: number,
|}>;

function mapBlockForSave(block: IBlock): BaseBlockInput {
  const {
    enableInputTransformation,
    inputTransfStrategy,
    inputParamDefinitions,
    enableInputStateTransformation,
    inputStateTransfStrategy,
    inputStateParamDefinitions,
  } = block.inputSettings;

  const {
    enableOutputTransformation,
    outputParamDefinitions,
    outputTranfStrategy,
    enableOutputStateTransformation,
    outputStateTransfStrategy,
    outputStateParamDefinitions,
  } = block.outputSettings;

  const {
    enableErrorHandling,
    enableRetryPolicy,
    retryInterval,
    units,
    maxAttemps,
    backoffRate,
  } = block.errorSettings;

  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
    enableInputTransformation: enableInputTransformation,
    inputTransfStrategy: inputTransfStrategy,
    inputParamDefinitions: inputParamDefinitions,
    enableInputStateTransformation: enableInputStateTransformation,
    inputStateTransfStrategy: inputStateTransfStrategy,
    inputStateParamDefinitions: inputStateParamDefinitions,
    enableOutputTransformation: enableOutputTransformation,
    outputTranfStrategy: outputTranfStrategy,
    outputParamDefinitions: outputParamDefinitions,
    enableOutputStateTransformation: enableOutputStateTransformation,
    outputStateTransfStrategy: outputStateTransfStrategy,
    outputStateParamDefinitions: outputStateParamDefinitions,
    enableErrorHandling: enableErrorHandling,
    enableRetryPolicy: enableRetryPolicy,
    retryInterval: retryInterval,
    units: units,
    maxAttemps: maxAttemps,
    backoffRate: backoffRate,
  };
}

export function mapConnectorsForSave(connector: IConnector): ConnectorInput {
  return {
    sourceBlockCid: connector.source?.id ?? '',
    targetBlockCid: connector.target?.id ?? '',
  };
}

const ignoredAttributes = ['parent'];

export function hasMeaningfulChanges(shape: IShape): boolean {
  if (isLasso(shape) || shape.changed == null) {
    return false;
  }

  const changedAttributes = Object.keys(shape.changed);

  return (
    changedAttributes.findIndex(
      attribute => !ignoredAttributes.includes(attribute),
    ) > -1
  );
}
