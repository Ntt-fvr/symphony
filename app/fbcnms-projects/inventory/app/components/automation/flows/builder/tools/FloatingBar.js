/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IVertexModel} from '../canvas/graph/shapes/vertexes/BaseVertext';

import IconButton from '@fbcnms/ui/components/design-system/IconButton';
import React, {useCallback, useEffect, useState} from 'react';
import {ArrowRightIcon} from '@fbcnms/ui/components/design-system/Icons';
import {TYPE as CreateWorkorderType} from '../canvas/graph/shapes/vertexes/blocks/actions/CreateWorkorder';
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

export default function FloatingBar() {
  const classes = useStyles();
  const [style, setStyle] = useState<FloatingBarStyle>(defaultStyle);
  const [activeGraphElement, setActiveGraphElement] = useState<?IVertexModel>(
    null,
  );

  const flow = useGraph();
  const selection = useGraphSelection();

  useEffect(() => {
    const newActiveGraphElement =
      selection.selectedElements.length === 1
        ? selection.selectedElements[0]
        : null;

    if (newActiveGraphElement == null) {
      setStyle(defaultStyle);
    } else {
      const position = newActiveGraphElement.attributes.position;
      const size = newActiveGraphElement.attributes.size;

      setStyle({
        left: `${position.x + size.width}px`,
        top: `${position.y + (size.height - 24) / 2}px`,
      });
    }

    setActiveGraphElement(newActiveGraphElement);
  }, [selection.selectedElements]);

  const addStep = useCallback(() => {
    if (activeGraphElement == null) {
      return;
    }

    const position = activeGraphElement.attributes.position;
    const size = activeGraphElement.attributes.size;

    const target = flow.addVertex(CreateWorkorderType, {
      text: 'new step',
      position: {
        x: position.x + size.width + 100,
        y: position.y,
      },
    });

    if (target) {
      flow.addEdge({source: activeGraphElement, target: target});
      // selectionChangedHandler({model: target});
    }
  }, [activeGraphElement, flow]);

  return (
    <div className={classes.root} style={style}>
      <IconButton icon={ArrowRightIcon} onClick={addStep} />
    </div>
  );
}
