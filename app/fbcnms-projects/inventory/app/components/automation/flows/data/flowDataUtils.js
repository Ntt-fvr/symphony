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
import type {BaseBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/BaseBlockSettingsTypes';
import type {ChoiceBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/choice/ChoiceSettingsType';
import type {
  ConnectorInput,
  ImportFlowDraftInput,
  ImportFlowDraftMutationResponse,
} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {EndBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/end/EndSettings';
import type {ExecuteFlowBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/executeFlow/ExecuteFlowSettingsType';
import type {GoToBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/goTo/GoToSettingsType';
import type {IBlock} from '../builder/canvas/graph/shapes/blocks/BaseBlock';
import type {IConnector} from '../builder/canvas/graph/shapes/connectors/BaseConnector';
import type {IShape} from '../builder/canvas/graph/facades/shapes/BaseShape';
import type {InvokeRestAPIBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiSettingsType';
import type {MutationCallbacks} from '../../../../mutations/MutationCallbacks';
import type {
  PublishFlowInput,
  PublishFlowMutationResponse,
} from '../../../../mutations/__generated__/PublishFlowMutation.graphql';
import type {StartBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartSettingsType';
import type {TrueFalseBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/trueFalse/TrueFalseSettings';

import {TYPE as TriggerStart} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as TriggerWorkforce} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerWorkforce';

import BaseBlock from '../builder/canvas/graph/shapes/blocks/BaseBlock';
import ImportFlowDraftMutation from '../../../../mutations/ImportFlowDraft';
import PublishFlowMutation from '../../../../mutations/PublishFlowMutation';
import {getGraphError} from '../../../../common/EntUtils';
import {isLasso} from '../builder/canvas/graph/facades/shapes/vertexes/helpers/Lasso';

const POINT_EXAMPLE = {role: 'DEFAULT', cid: 'hola'};
const VARIABLE_EXPRESSION_EXAMPLE = {
  type: 'VariableDefinition',
  expression: 'a',
  blockVariables: [],
};
const HEADERS_EXAMPLE = {
  variableDefinitionKey: 'VariableDefinition',
  value: 'a',
};

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

function mapBaseBlockInformation(block: IBlock) {
  const {inputSettings, outputSettings, errorSettings} = block;
  const {
    addOriginal,
    addOriginalJson,
    additionMethod,
    ...tempOutputSettings
  } = outputSettings;
  return {
    ...inputSettings,
    ...tempOutputSettings,
    ...errorSettings,
  };
}

export function mapStartBlockForSave(block: IBlock): StartBlockInputType {
  const {paramDefinitions} = block.settings;
  return {
    cid: block.id,
    // TODO AVeriguar
    paramDefinitions: {key: 'prueba', type: 'STRING', choices: ['1']},
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapChoiceBlockForSave(block: IBlock): ChoiceBlockInputType {
  const {routes} = block.settings;
  const newRoutes = routes?.map(route => ({
    cid: route.id,
    condition: route.rule,
  }));
  return {
    ...mapBlockForSave(block),
    basicDefinitions: mapBaseBlockInformation(block),
    entryPoint: POINT_EXAMPLE,
    routes: [],
  };
}

export function mapTrueFalseBlockForSave(
  block: IBlock,
): TrueFalseBlockInputType {
  return {
    ...mapBlockForSave(block),
  };
}

export function mapInvokeRestAPIBlockForSave(
  block: IBlock,
): InvokeRestAPIBlockInputType {
  const {
    entryPoint,
    exitPoint,
    method,
    url,
    connectionTimeOut,
    body,
    headers,
  } = block.settings;
  return {
    ...mapBlockForSave(block),
    entryPoint: POINT_EXAMPLE,
    exitPoint: POINT_EXAMPLE,
    method: method,
    url: url,
    connectionTimeOut: connectionTimeOut,
    body: body,
    headers: HEADERS_EXAMPLE,
    basicDefinitions: mapBaseBlockInformation(block),
    params: VARIABLE_EXPRESSION_EXAMPLE,
  };
}

export function mapGoToBlockForSave(block: IBlock): GoToBlockInputType {
  const {type, targetBlockCid} = block.settings;
  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
    targetBlockCid: targetBlockCid,
    type: type,
  };
}

export function mapActionBlocksForSave(
  block: IBlock,
): ExecuteFlowBlockInputType {
  const {flow} = block.settings;
  return {
    ...mapBlockForSave(block),
    flow: flow,
  };
}

export function mapTriggerBlocksForSave(block: IBlock) {
  switch (block.model.attributes.type) {
    case TriggerStart:
      return {};
    case TriggerWorkforce:
      return {};
    default:
      return;
  }
}

export function mapTimerBlocksForSave(block: IBlock) {
  const {
    behavior,
    seconds,
    specificDatetime,
    enableExpressionL,
    expression,
    exitPoint,
  } = block.settings;

  return {
    cid: block.id,
    behavior: behavior,
    seconds: seconds,
    specificDatetime: specificDatetime,
    enableExpressionL: enableExpressionL,
    expression: expression,
    exitPoint: POINT_EXAMPLE,
    entryPoint: POINT_EXAMPLE,
    params: VARIABLE_EXPRESSION_EXAMPLE,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapWaitForSignalBlocksForSave(block: IBlock) {
  const {signalType, signalModule, customFilter, blocked} = block.settings;

  return {
    ...mapBlockForSave(block),
    type: signalType,
    signalModule: 'CONFIGURATION',
    customFilter: customFilter,
    blocked: blocked,
    entryPoint: POINT_EXAMPLE,
    exitPoint: POINT_EXAMPLE,
    basicDefinitions: mapBaseBlockInformation(block),
    params: VARIABLE_EXPRESSION_EXAMPLE,
  };
}

export function mapEndBlockForSave(block: IBlock): EndBlockInputType {
  const {params} = block.settings;
  return {
    cid: block.id,
    params: [],
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

function mapBlockForSave(block: IBlock): BaseBlockInputType {
  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
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

export const saveBlockInformation = (
  blockFormQuery,
  createdBlock: BaseBlock,
) => {
  createdBlock.setInputSettings({
    enableInputTransformation: blockFormQuery.enableInputTransformation,
    inputTransfStrategy: blockFormQuery.inputTransfStrategy,
    inputParamDefinitions: blockFormQuery.inputParamDefinitions?.toString(),
    enableInputStateTransformation:
      blockFormQuery.enableInputStateTransformation,
    inputStateTransfStrategy: blockFormQuery.inputStateTransfStrategy,
    inputStateParamDefinitions: blockFormQuery.inputStateParamDefinitions,
  });
  createdBlock.setOutputSettings({
    enableOutputTransformation: blockFormQuery.enableOutputTransformation,
    outputTransfStrategy: blockFormQuery.outputTransfStrategy,
    outputParamDefinitions: blockFormQuery.outputParamDefinitions?.toString(),
    enableOutputStateTransformation:
      blockFormQuery.enableOutputStateTransformation,
    outputStateTransfStrategy: blockFormQuery.outputStateTransfStrategy,
    outputStateParamDefinitions: blockFormQuery.outputStateParamDefinitions,
    addOriginal: blockFormQuery.addOriginal,
    addOriginalJson: blockFormQuery.addOriginalJson,
    additionMethod: blockFormQuery.additionMethod,
  });
  createdBlock.setErrorSettings({
    enableErrorHandling: blockFormQuery.enableErrorHandling,
    enableRetryPolicy: blockFormQuery.enableRetryPolicy,
    retryInterval: blockFormQuery.retryInterval,
    units: blockFormQuery.units,
    maxAttemps: blockFormQuery.maxAttemps,
    backoffRate: blockFormQuery.backoffRate,
  });
  const {__typename, ...configurationParameters} = blockFormQuery.details;
  createdBlock.setSettings(configurationParameters);
};
