/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {IBlock} from '../../../../canvas/graph/shapes/blocks/BaseBlock';

import * as React from 'react';
import BlockNameInput from './BlockNameInput';
import ConfigurationChoice from './ConfigurationChoice';
import ConfigurationExecuteFlow from './ConfigurationExecuteFlow';
import ConfigurationForEachLoop from './ConfigurationForEachLoop';
import ConfigurationGoTo from './ConfigurationGoTo';
import ConfigurationInvokeApi from './ConfigurationInvokeApi';
import ConfigurationNetworkAction from './ConfigurationNetworkAction';
import ConfigurationParallel from './ConfigurationParallel';
import ConfigurationTimer from './ConfigurationTimer';
import ConfigurationTriggeredStart from './ConfigurationTriggeredStart';
import ConfigurationWaitForSignal from './ConfigurationWaitForSignal';
import {TYPE as ChoiceType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/logic/Decision';
import {TYPE as ExecuteFlowType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteFlow';
import {TYPE as ExecuteNetworkActionType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteNetworkAction';
import {TYPE as ForEachLoopType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as GoToType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/logic/GoTo';
import {Grid} from '@material-ui/core';
import {TYPE as InvokeRestApiType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/actions/InvokeRestApi';
import {TYPE as Parallel} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/logic/Parallel';
import {TYPE as TimerType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/Timer';
import {TYPE as TriggerStartType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as WaitSignalType} from '../../../../../../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/WaitSignal';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
    },
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigureSettings = ({block}: Props) => {
  const classes = useStyles();

  const getConfigurationBlock = ({type}) => {
    switch (type) {
      case TimerType:
        return <ConfigurationTimer block={block} />;
      case GoToType:
        return <ConfigurationGoTo block={block} />;
      case ExecuteFlowType:
        return <ConfigurationExecuteFlow block={block} />;
      case WaitSignalType:
        return <ConfigurationWaitForSignal block={block} />;
      case TriggerStartType:
        return <ConfigurationTriggeredStart block={block} />;
      case InvokeRestApiType:
        return <ConfigurationInvokeApi block={block} />;
      case ExecuteNetworkActionType:
        return <ConfigurationNetworkAction block={block} />;
      case ForEachLoopType:
        return <ConfigurationForEachLoop block={block} />;
      case Parallel:
        return <ConfigurationParallel block={block} />;
      case ChoiceType:
        return <ConfigurationChoice block={block} />;
      default:
        return '';
    }
  };

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <BlockNameInput block={block} />
      </Grid>
      {getConfigurationBlock(block)}
    </Grid>
  );
};

export default ConfigureSettings;
