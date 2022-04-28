/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import {getPropertyTypeValuesToReducer} from './PropertyTypeValuesHelpers';

const DependentPropertyTypesReducerTypes = {
  updateDependenceProperty: 'update_dependence_property',
  updatePropertyTypesValue: 'update_property_types_value',
};

const DependentPropertyTypesReducerInit: function = ({
  dependentPropertyInitial,
}) => {
  const propertyTypeValues = !!dependentPropertyInitial
    ? dependentPropertyInitial.propertyTypeValues
    : [];
  return {
    ...dependentPropertyInitial,
    type: 'enum',
    stringValue: null,
    propertyTypeValues,
  };
};

const DependentPropertyTypesReducer = (state, action) => {
  switch (action.type) {
    case DependentPropertyTypesReducerTypes.updateDependenceProperty:
      return {
        ...state,
        ...action.payload,
        type: 'enum',
        stringValue: null,
      };
    case DependentPropertyTypesReducerTypes.updatePropertyTypesValue:
      const propertyTypeValues = getPropertyTypeValuesToReducer(
        state.propertyTypeValues,
        action.payload,
      );
      return {...state, propertyTypeValues};
    default:
      throw new Error();
  }
};

export {
  DependentPropertyTypesReducerTypes,
  DependentPropertyTypesReducerInit,
  DependentPropertyTypesReducer,
};
