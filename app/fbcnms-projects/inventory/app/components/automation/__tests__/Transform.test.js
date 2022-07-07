/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import {render, screen} from '@testing-library/react';

import Transform from '../flows/builder/widgets/detailsPanel/inputs/Transform';

describe('Suite Test Component <Trasnform/>', () => {
  const props = {
    inputTransformValue: false,
    inputTransformName: 'testName',
    inputTransformLabel: 'testLabel',
    inputStrategyValue: '',
    inputStrategyName: '',
    inputStrategyLabel: 'testSLabel',
    inputJsonValue: '',
    strategies: [],
    inputJsonName: '',
    handleInputChange: function name() {
      return;
    },
  };

  it('AUT-FE-05069 Render <Trasnform/>', () => {
    render(<Transform {...props} />);
    const label = screen.getByText(/testlabel/i);
    expect(label).toBeInTheDocument();
    render(<Transform {...{...props, inputTransformValue: true}} />);
    const objectLabel = screen.getAllByText(/testlabel/i);
    expect(objectLabel.length).toBeGreaterThan(1);
  });
});
