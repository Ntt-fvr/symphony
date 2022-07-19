/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Menu from '@material-ui/core/Menu';
import React, {useState} from 'react';
import {MenuItem} from '@material-ui/core';
import {RULE_NAME} from '../../canvas/graph/shapes/connectors/helper';
import {useFlowData} from '../../../data/FlowDataContext';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';

export default function MenuRules() {
  const [menu, setMenu] = useState(null);
  const [selectLabel, setSelectLabel] = useState('');

  const data = useFlowData();

  const grap = useGraph();

  grap.onConnectorEvent('link:contextmenu', function (cellView, evt) {
    handleContextMenu(evt, cellView);
  });

  const handleContextMenu = (event, label) => {
    event.preventDefault();
    if (label.model.attributes.labels?.length > 0) {
      setSelectLabel(label);
      setMenu(
        menu === null
          ? {
              mouseX: event.clientX - 2,
              mouseY: event.clientY - 4,
            }
          : null,
      );
    }
  };

  const handleClose = event => {
    selectLabel.model.label(0, {
      attrs: {label: {text: event.target.innerText || RULE_NAME}},
    });
    setMenu(null);
  };

  return (
    <>
      <Menu
        open={menu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menu !== null ? {top: menu.mouseY, left: menu.mouseX} : undefined
        }>
        <MenuItem onClick={handleClose}>Rule 1</MenuItem>
        <MenuItem onClick={handleClose}>Rule 2</MenuItem>
        <MenuItem onClick={handleClose}>Rule 3</MenuItem>
        <MenuItem onClick={handleClose}>{RULE_NAME}</MenuItem>
      </Menu>
    </>
  );
}
