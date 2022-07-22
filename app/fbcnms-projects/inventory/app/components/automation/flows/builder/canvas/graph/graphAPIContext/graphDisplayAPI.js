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

import type {FlowWrapper, FlowWrapperReference} from './GraphContext';
import type {Position} from '../facades/Helpers';

import {getRectCenter, getRectDiff} from '../../../../utils/helpers';

export type GraphDisplayAPI = $ReadOnly<{|
  zoomIn: () => void,
  zoomOut: () => void,
  zoomFit: () => void,
  zoomScroll: () => void,
  move: Position => void,
  reset: () => void,
  setPaperInteractionLocked: boolean => void,
  paperInteractionIsLocked: () => boolean,
  showGrid: () => void,
  hiddenGrid: () => void,
|}>;

export default function graphDisplayAPIProvider(
  flowWrapper: FlowWrapperReference,
): GraphDisplayAPI {
  const zoomIn = paperZoomIn.bind(flowWrapper);
  const zoomOut = paperZoomOut.bind(flowWrapper);
  const zoomFit = paperZoomFit.bind(flowWrapper);
  const zoomScroll = paperZoomScroll.bind(flowWrapper);
  const move = paperMove.bind(flowWrapper);
  const reset = paperReset.bind(flowWrapper);
  const setPaperInteractionLocked = paperSetLocked.bind(flowWrapper);
  const paperInteractionIsLocked = interactionIsLocked.bind(flowWrapper);
  const showGrid = paperShowGrid.bind(flowWrapper);
  const hiddenGrid = paperHiddenGrid.bind(flowWrapper);

  return {
    zoomIn,
    zoomOut,
    zoomFit,
    zoomScroll,
    move,
    reset,
    setPaperInteractionLocked,
    paperInteractionIsLocked,
    showGrid,
    hiddenGrid,
  };
}

function paperZoom(factor?: 1 | -1 | 0 = 1) {
  if (this.current == null) {
    return;
  }
  const flow: FlowWrapper = this.current;

  if (factor === 0) {
    flow.paperScale = 1;
  } else {
    flow.paperScale *= 1 + 0.1 * factor;
  }

  const paperRectBeforeScale = flow.paper.getContentBBox();

  flow.paper.scale(flow.paperScale);

  const paperRectAfterScale = flow.paper.getContentBBox();

  const rectChange = getRectDiff(paperRectAfterScale, paperRectBeforeScale);
  const originChange = getRectCenter(rectChange);

  paperMove.call(this, originChange);
}

function paperZoomIn() {
  paperZoom.call(this);
}

function paperZoomOut() {
  paperZoom.call(this, -1);
}

function paperZoomFit() {
  if (this.current == null) {
    return;
  }
  const flow: FlowWrapper = this.current;

  flow.paper.scaleContentToFit({padding: 32});

  const scaleObject = flow.paper.scale();
  if (scaleObject == null) {
    return;
  }
  const scaleValue = Math.trunc(scaleObject.sx * 10) / 10;
  flow.paperScale = scaleValue;

  const translationObject = flow.paper.translate();
  if (translationObject == null) {
    return;
  }
  flow.paperTranslation = {
    x: translationObject.tx,
    y: translationObject.ty,
  };
}

function paperZoomScroll(event) {
  event.deltaY < 0 ? paperZoom.call(this) : paperZoom.call(this, -1);
}

function paperMove(translation: Position | 0) {
  if (this.current == null) {
    return;
  }

  if (translation === 0) {
    this.current.paperTranslation = {
      x: 0,
      y: 0,
    };
  } else {
    this.current.paperTranslation = {
      x: this.current.paperTranslation.x + translation.x,
      y: this.current.paperTranslation.y + translation.y,
    };
  }
  this.current.paper.translate(
    this.current.paperTranslation.x,
    this.current.paperTranslation.y,
  );
}

function paperReset() {
  paperZoom.call(this, 0);
  paperMove.call(this, 0);
}

function paperSetLocked(locked: boolean) {
  if (this.current == null) {
    return;
  }

  this.current.paperIsLocked = locked;
}

function interactionIsLocked() {
  return this.current?.paperIsLocked === true;
}

function paperShowGrid() {
  paperGrid.call(this, true);
}

function paperHiddenGrid() {
  paperGrid.call(this, false);
}

function paperGrid(isShow: boolean) {
  if (this.current == null) {
    return;
  }
  const flow: FlowWrapper = this.current;
  !isShow ? flow.paper.setGridSize(30) : flow.paper.setGridSize(1);
}
