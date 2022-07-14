/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import 'jest-dom/extend-expect';
import ResourceTypes from '../configure/ResourceTypes';

import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {cleanup, render} from '@testing-library/react';

jest.mock('../configure/ResourceTypes', () => () => (
  <div>ResourceTypesPage</div>
));

const Wrapper = props => (
  <MemoryRouter initialEntries={[props.path]} initialIndex={1}>
    <Route path="/inventory">{props.children}</Route>
  </MemoryRouter>
);

afterEach(cleanup);

global.CONFIG = {
  appData: {
    enabledFeatures: [],
    tabs: ['inventory'],
    user: {
      isSuperUser: false,
    },
  },
  MAPBOX_ACCESS_TOKEN: '',
};

test('renders /configure/resource_types', () => {
  const {getByText} = render(
    <Wrapper path={'/inventory/configure/resource_types'}>
      <ResourceTypes />
    </Wrapper>,
  );

  expect(getByText('ResourceTypesPage')).toBeInTheDocument();
});
