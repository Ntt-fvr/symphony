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

import type {
  IVertexModel,
  IVertexView,
} from '../../facades/shapes/vertexes/BaseVertext';
import type {Paper} from '../../facades/Paper';

export interface IBlock {
  +id: string;
  +select: () => void;
  +deselect: () => void;
  +model: IVertexModel;
  +view: IVertexView;
  +type: string;
  +isSelected: boolean;
}

export default class BaseBlock implements IBlock {
  paper: Paper;
  model: IVertexModel;
  view: IVertexView;
  type: string;
  isSelected: boolean;
  id: string;

  constructor(model: IVertexModel, paper: Paper) {
    this.paper = paper;
    this.model = model;

    const graph = this.paper.model;
    this.model.addTo(graph);

    this.view = paper.findViewByModel(model);

    this.type = model.attributes.type;
    this.id = model.id;
  }

  select() {
    this.isSelected = true;
    this.view.highlight();
  }

  deselect() {
    this.isSelected = false;
    this.view.unhighlight();
  }
}
