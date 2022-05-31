/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {RuleType} from './context/rules/RuleType';

import DraggableTableRow from '../../../../../../draggable/DraggableTableRow';
import DroppableTableBody from '../../../../../../draggable/DroppableTableBody';
import React, {useContext} from 'react';
import Rule from './Rule';
import RulesTableDispatcher from './context/rules/RulesTableDispatcher';
import {TableCell, TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {sortByIndex} from '../../../../../../draggable/DraggableUtils';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1366px',
    overflowX: 'auto',
  },
}));

type Props = $ReadOnly<{|
  rules: RuleType[],
|}>;

const RulesList = (props: Props) => {
  const classes = useStyles();
  const {rules} = props;
  const dispatch = useContext(RulesTableDispatcher);

  return (
    <div className={classes.container}>
      <DroppableTableBody
        onDragEnd={({source, destination}) => {
          if (destination != null) {
            dispatch({
              type: 'CHANGE_RULE_INDEX',
              sourceIndex: source.index,
              destinationIndex: destination.index,
            });
          }
        }}>
        {rules
          .filter(rule => !rule.isDeleted && !rule.isDefault)
          .sort(sortByIndex)
          .map(rule => (
            <DraggableTableRow id={rule.id} index={rule.index}>
              <Rule rule={rule} label={'Name rule'} />
            </DraggableTableRow>
          ))}
        {rules
          .filter(rule => !!rule.isDefault)
          .map(rule => (
            <TableRow component="div" id={rule.id} key={rule.id}>
              <TableCell colSpan={2}>
                <Rule rule={rule} label={'Default Rule'} />
              </TableCell>
            </TableRow>
          ))}
      </DroppableTableBody>
    </div>
  );
};
export default RulesList;
