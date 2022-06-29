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
import type {
  ConnectorInput,
  ImportFlowDraftInput,
  ImportFlowDraftMutationResponse,
} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {DecisionBlockInputType} from '../builder/canvas/graph/shapes/blocks/blockTypes/decision/DecisionSettingsType';
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

import {TYPE as TimerType} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/Timer';
import {TYPE as TriggerStart} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as TriggerWorkforce} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerWorkforce';
import {TYPE as WaitSignal} from '../builder/canvas/graph/facades/shapes/vertexes/triggers/WaitSignal';

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

export function mapStartBlockForSave(block: IBlock): StartBlockInputType {
  const {paramDefinitions} = block.settings;
  return {
    cid: block.id,
    paramDefinitions: paramDefinitions,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

export function mapDecisionBlockForSave(block: IBlock): DecisionBlockInputType {
  const {routes} = block.settings;
  const newRoutes = routes?.map(route => ({
    cid: route.id,
    name: route.name,
    condition: route.rule,
  }));
  return {
    ...mapBlockForSave(block),
    routes: newRoutes,
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
    entryPoint: entryPoint,
    exitPoint: exitPoint,
    method: method,
    url: url,
    connectionTimeOut: connectionTimeOut,
    body: body,
    headers: headers,
  };
}

export function mapGoToBlockForSave(block: IBlock): GoToBlockInputType {
  const {goToType, targetBlockCid} = block.settings;
  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
    targetBlockCid: targetBlockCid,
    type: goToType,
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

type TriggerBlockInputType = {
  type?: string,
  signalModule?: string,
  customFilter?: string,
  blocked?: boolean,
  behavior?: string,
  seconds?: number,
  datetime?: string,
  enableExpressionL?: boolean,
  expression?: string,
  exitPoint?: string,
};

export function mapTriggerBlocksForSave(block: IBlock): TriggerBlockInputType {
  const {
    blocked,
    customFilter,
    signalModule,
    signalType,
    behavior,
    seconds,
    datetime,
    enableExpressionL,
    expression,
    exitPoint,
  } = block.settings;

  switch (block.model.attributes.type) {
    case TimerType:
      return {
        cid: block.id,
        behavior: behavior,
        seconds: seconds,
        datetime: datetime,
        enableExpressionL: enableExpressionL,
        expression: expression,
        exitPoint: exitPoint,
        uiRepresentation: {
          name: block.name,
          xPosition: Math.floor(block.model.attributes.position.x),
          yPosition: Math.floor(block.model.attributes.position.y),
        },
      };
    case TriggerStart:
      return {};
    case TriggerWorkforce:
      return {};
    case WaitSignal:
      return {
        ...mapBlockForSave(block),
        type: signalType,
        signalModule: signalModule,
        customFilter: customFilter,
        blocked: blocked,
      };
    default:
      return;
  }
}

export function mapEndBlockForSave(block: IBlock): EndBlockInputType {
  const {params} = block.settings;
  return {
    cid: block.id,
    params: params,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
  };
}

function mapBlockForSave(block: IBlock): BaseBlockInputType {
  const {inputSettings, outputSettings, errorSettings} = block;

  return {
    cid: block.id,
    uiRepresentation: {
      name: block.name,
      xPosition: Math.floor(block.model.attributes.position.x),
      yPosition: Math.floor(block.model.attributes.position.y),
    },
    ...inputSettings,
    ...outputSettings,
    ...errorSettings,
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
