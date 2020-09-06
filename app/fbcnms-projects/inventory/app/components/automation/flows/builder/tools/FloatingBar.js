/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlock} from '../canvas/graph/shapes/blocks/BaseBlock';
import type {Position} from '../canvas/graph/facades/Helpers';

import IconButton from '@symphony/design-system/components/IconButton';
import React, {useCallback, useEffect, useState} from 'react';
import {ArrowRightIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../canvas/graph/GraphContext';
import {useGraphSelection} from '../widgets/selection/GraphSelectionContext';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    zIndex: 1,
  },
}));

type FloatingBarStyle = $ReadOnly<{|
  display?: string,
  left?: string,
  top?: string,
|}>;
const defaultStyle = {display: 'none'};

function mouseEventArgsToPosition(args: {
  +clientX: number,
  +clientY: number,
}): Position {
  return {
    x: args.clientX,
    y: args.clientY,
  };
}

export default function FloatingBar() {
  const classes = useStyles();
  const [style, setStyle] = useState<FloatingBarStyle>(defaultStyle);
  const [activeBlock, setActiveBlock] = useState<?IBlock>(null);

  const flow = useGraph();
  const selection = useGraphSelection();

  useEffect(() => {
    const newActiveBlock =
      selection.selectedElements.length === 1
        ? selection.selectedElements[0]
        : null;

    if (newActiveBlock == null) {
      setStyle(defaultStyle);
    } else {
      const position = newActiveBlock.model.attributes.position;
      const size = newActiveBlock.model.attributes.size;

      setStyle({
        left: `${position.x + size.width + 16}px`,
        top: `${position.y + (size.height - 24) / 2}px`,
      });
    }

    setActiveBlock(newActiveBlock);
  }, [selection.selectedElements]);

  const addStep = useCallback(
    args => {
      if (activeBlock == null) {
        return;
      }

      const connector = flow.addConnector({source: activeBlock});
      if (connector == null) {
        return;
      }

      const snapToPointer = mouseEventArgs =>
        connector.snapTargetToPointer(mouseEventArgsToPosition(mouseEventArgs));
      snapToPointer(args);
      window.addEventListener('mousemove', snapToPointer);

      const trySettingSource = (mouseEventArgs: MouseEvent) => {
        connector.tryAttachingAtPoint(
          mouseEventArgsToPosition(mouseEventArgs),
          flow,
        );
        window.removeEventListener('mousemove', snapToPointer);
      };
      window.addEventListener('mouseup', trySettingSource, {once: true});
    },
    [activeBlock, flow],
  );

  return (
    <div className={classes.root} style={style}>
      <IconButton icon={ArrowRightIcon} onMouseDown={addStep} />
    </div>
  );
}
