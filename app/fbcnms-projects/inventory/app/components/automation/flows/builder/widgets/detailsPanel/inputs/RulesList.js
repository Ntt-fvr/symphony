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
    minWidth: '330px',
    overflowX: 'auto',
    display: 'flex',
    justifCcontent: 'center',
  },
  draggableTableRow: {
    height: 'auto',
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
  },
  tableCellDraggableTableRow: {
    border: 0,
    marginRight: '-11px',
  },
  tableCell: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 24,
    borderTop: '0.5px solid #D2DAE7',
    width: '103%',
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
          .filter(rule => !rule.isDeleted)
          .sort(sortByIndex)
          .map(rule => (
            <DraggableTableRow
              id={rule.id}
              index={rule.index}
              draggableCellClassName={classes.tableCellDraggableTableRow}
              className={classes.draggableTableRow}>
              <Rule rule={rule} label={'Name rule'} />
            </DraggableTableRow>
          ))}
      </DroppableTableBody>
    </div>
  );
};
export default RulesList;
