/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddIcon from '@material-ui/icons/Add';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useEffect} from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import ToolsBar from './ToolsBar';
import Tooltip from '../widgets/detailsPanel/inputs/Tooltip';
import usePaperGrab from '../widgets/navigation/usePaperGrab';
import {BLUE, DARK} from '@symphony/design-system/theme/symphony';
import {PanToolsIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../canvas/graph/graphAPIContext/GraphContext';

const useStyles = makeStyles(() => ({
  root: {
    bottom: 13,
    '& div[class*="textVariant"]': {
      height: 36,
      width: 36,
      background:
        'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
      borderRadius: 4,
      color: DARK.D900,
      fill: DARK.D900,
      '&:hover': {
        color: BLUE.B600,
        fill: BLUE.B600,
        '& svg': {
          color: BLUE.B600,
        },
      },
    },
  },
  marginRight: {
    marginRight: '16px',
  },
  buttonOut: {
    borderRadius: '4px 0 0 4px !important',
  },
  buttonIn: {
    marginLeft: '2px !important',
    borderRadius: '0px 4px 4px 0px !important',
  },
  blue: {
    color: BLUE.B600 + ' !important',
    fill: BLUE.B600 + ' !important',
  },
}));

export default function BottomBar() {
  const classes = useStyles();
  const flow = useGraph();
  const [isOnGrabMode, handleOnGrabMode] = usePaperGrab();

  useEffect(() => {
    const canvas = document.getElementById('graphContainer');
    canvas.addEventListener('wheel', flow.zoomScroll);
  }, []);

  return (
    <ToolsBar className={classes.root}>
      <Tooltip tooltip={'Zoom Out'}>
        <IconButton
          className={classes.buttonOut}
          skin={'regular'}
          onClick={() => flow.zoomOut()}
          icon={RemoveIcon}
        />
      </Tooltip>
      <Tooltip tooltip={'Zoom In'}>
        <IconButton
          className={classes.buttonIn}
          skin={'regular'}
          onClick={() => flow.zoomIn()}
          icon={AddIcon}
        />
      </Tooltip>
      <Tooltip tooltip={'Zoom Fit'}>
        <IconButton
          skin={'regular'}
          onClick={() => flow.zoomFit()}
          icon={FilterCenterFocusIcon}
        />
      </Tooltip>
      <Tooltip tooltip={'Pan Toll'}>
        <IconButton
          className={isOnGrabMode ? classes.blue : null}
          skin={'regular'}
          onClick={() =>
            isOnGrabMode ? handleOnGrabMode(true) : handleOnGrabMode(false)
          }
          icon={PanToolsIcon}
        />
      </Tooltip>
    </ToolsBar>
  );
}
