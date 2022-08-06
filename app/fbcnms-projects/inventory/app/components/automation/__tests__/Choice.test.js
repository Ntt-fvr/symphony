/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import '@testing-library/jest-dom';
import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';

import ChoiceBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/choice/ChoiceBlockType';
import ChoicePresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/choice/ChoicePresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Choice/ : ', () => {
  it('AUT-FE-05009 Render component <ChoicePresentation/>', () => {
    render(<ChoicePresentation />);
    const text = screen.getByText(/choice/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05010 Instance class ChoiceBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ChoiceBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/choiceBlock/i);
    expect(text).toBeInTheDocument();
  });
});
