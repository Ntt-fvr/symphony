/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */


/*[object Object]*/
// eslint-disable-next-line header/header

import React from 'react';
import Switch from '@material-ui/core/Switch';

function SwitchLabels() {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  return (
    <Switch
      checked={state.checked}
      onChange={handleChange}
      name="checked"
      color="primary"
    />
  );
}
export default SwitchLabels;
