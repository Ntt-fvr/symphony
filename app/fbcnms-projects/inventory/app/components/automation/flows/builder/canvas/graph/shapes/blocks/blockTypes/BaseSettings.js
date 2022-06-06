/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import {TYPE as CreateWorkorderType} from '../../../facades/shapes/vertexes/actions/CreateWorkorder';
import {TYPE as DecisionType} from '../../../facades/shapes/vertexes/logic/Decision';
import {TYPE as EndType} from '../../../facades/shapes/vertexes/administrative/End';
import {TYPE as ExecuteFlowType} from '../../../facades/shapes/vertexes/actions/ExecuteFlow';
import {TYPE as ExecuteNetworkActionType} from '../../../facades/shapes/vertexes/actions/ExecuteNetworkAction';
import {TYPE as ForEachLoopType} from '../../../facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as GoToType} from '../../../facades/shapes/vertexes/logic/GoTo';
import {TYPE as InvokeRestApiType} from '../../../facades/shapes/vertexes/actions/InvokeRestApi';
import {TYPE as ManualStartType} from '../../../facades/shapes/vertexes/administrative/ManualStart';
import {TYPE as ParallelType} from '../../../facades/shapes/vertexes/logic/Parallel';
import {TYPE as TimerType} from '../../../facades/shapes/vertexes/triggers/Timer';
import {TYPE as TriggerStartType} from '../../../facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as TriggerWorkforceType} from '../../../facades/shapes/vertexes/triggers/TriggerWorkforce';
import {TYPE as TrueFalseType} from '../../../facades/shapes/vertexes/logic/TrueFalse';
import {TYPE as UpdateInventoryType} from '../../../facades/shapes/vertexes/actions/UpdateInventory';
import {TYPE as UpdateWorkforceType} from '../../../facades/shapes/vertexes/actions/UpdateWorkforce';
import {TYPE as WaitSignalType} from '../../../facades/shapes/vertexes/triggers/WaitSignal';
import {
  initialCreateWorkorderSettings,
  setCreateWorkorderSettings,
} from './createWorkorder/CreateWorkorderSettings';
import {
  initialDecisionSettings,
  setDecisionSettings,
} from './decision/DecisionSettings';
import {initialEndSettings, setEndSettings} from './end/EndSettings';
import {
  initialExecuteFlowSettings,
  setExecuteFlowSettings,
} from './executeFlow/ExecuteFlowSettings';
import {
  initialExecuteNetworkActionSettings,
  setExecuteNetworkActionSettings,
} from './executeNetworkAction/ExecuteNetworkActionSettings';
import {
  initialForEachLoopSettings,
  setForEachLoopSettings,
} from './forEachLoop/ForEachLoopSettings';
import {initialGoToSettings, setGoToSettings} from './goTo/GoToSettings';
import {
  initialInvokeRestApiSettings,
  setInvokeRestApiSettings,
} from './invokeRestApi/InvokeRestApiSettings';
import {
  initialManualStartSettings,
  setManualStartSettings,
} from './manualStart/ManualStartSettings';
import {
  initialParallelSettings,
  setParallelSettings,
} from './parallel/ParallelSettings';
import {initialTimerSettings, setTimerSettings} from './timer/TimerSettings';
import {
  initialTriggerStartSettings,
  setTriggerStartSettings,
} from './triggerStart/TriggerStartSettings';
import {
  initialTriggerWorkforceSettings,
  setTriggerWorkforceSettings,
} from './triggerWorkforce/TriggerWorkforceSettings';
import {
  initialTrueFalseSettings,
  setTrueFalseSettings,
} from './trueFalse/TrueFalseSettings';
import {
  initialUpdateInventorySettings,
  setUpdateInventorySettings,
} from './updateInventory/UpdateInventorySettings';
import {
  initialUpdateWorkforceSettings,
  setUpdateWorkforceSettings,
} from './updateWorkforce/UpdateWorkforceSettings';
import {
  initialWaitSignalSettings,
  setWaitSignalSettings,
} from './waitSignal/WaitSignalSettings';

export const getInitialBlockSettings = type => {
  switch (type) {
    // Actions
    case CreateWorkorderType:
      return initialCreateWorkorderSettings;
    case ExecuteFlowType:
      return initialExecuteFlowSettings;
    case ExecuteNetworkActionType:
      return initialExecuteNetworkActionSettings;
    case InvokeRestApiType:
      return initialInvokeRestApiSettings;
    case UpdateInventoryType:
      return initialUpdateInventorySettings;
    case UpdateWorkforceType:
      return initialUpdateWorkforceSettings;
    // Administrative
    case ManualStartType:
      return initialManualStartSettings;
    case EndType:
      return initialEndSettings;
    // Logic
    case DecisionType:
      return initialDecisionSettings;
    case ForEachLoopType:
      return initialForEachLoopSettings;
    case GoToType:
      return initialGoToSettings;
    case ParallelType:
      return initialParallelSettings;
    case TrueFalseType:
      return initialTrueFalseSettings;
    // Triggers
    case TimerType:
      return initialTimerSettings;
    case TriggerStartType:
      return initialTriggerStartSettings;
    case TriggerWorkforceType:
      return initialTriggerWorkforceSettings;
    case WaitSignalType:
      return initialWaitSignalSettings;
    default:
      return '';
  }
};

export const setBlockSettings = (type, newSettings) => {
  switch (type) {
    // Actions
    case CreateWorkorderType:
      return setCreateWorkorderSettings(newSettings);
    case ExecuteFlowType:
      return setExecuteFlowSettings(newSettings);
    case ExecuteNetworkActionType:
      return setExecuteNetworkActionSettings(newSettings);
    case InvokeRestApiType:
      return setInvokeRestApiSettings(newSettings);
    case UpdateInventoryType:
      return setUpdateInventorySettings(newSettings);
    case UpdateWorkforceType:
      return setUpdateWorkforceSettings(newSettings);
    // Administrative
    case ManualStartType:
      return setManualStartSettings(newSettings);
    case EndType:
      return setEndSettings(newSettings);
    // Logic
    case DecisionType:
      return setDecisionSettings(newSettings);
    case ForEachLoopType:
      return setForEachLoopSettings(newSettings);
    case GoToType:
      return setGoToSettings(newSettings);
    case ParallelType:
      return setParallelSettings(newSettings);
    case TrueFalseType:
      return setTrueFalseSettings(newSettings);
    // Triggers
    case TimerType:
      return setTimerSettings(newSettings);
    case TriggerStartType:
      return setTriggerStartSettings(newSettings);
    case TriggerWorkforceType:
      return setTriggerWorkforceSettings(newSettings);
    case WaitSignalType:
      return setWaitSignalSettings(newSettings);
    default:
      return '';
  }
};
