/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import type {DropResult, ResponderProvided} from 'react-beautiful-dnd';

import * as React from 'react';
import TableBody from '@material-ui/core/TableBody';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

type Props = $ReadOnly<{|
  className?: string,
  children?: React.Node,
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void,
|}>;

const DroppableComponent = (
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void,
) => props => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'1'}>
        {provided => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...props}>
              {props.children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default function DroppableTableBody(props: Props) {
  const {children, className, onDragEnd} = props;
  const bodyComponent = DroppableComponent((a1, a2) => onDragEnd(a1, a2));
  return (
    <TableBody className={className} component={bodyComponent}>
      {children}
    </TableBody>
  );
}
